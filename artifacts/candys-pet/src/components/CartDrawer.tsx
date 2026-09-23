import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Banknote, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { WA_NUMBER } from '../lib/constants';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, SHIPPING_PROVIDERS, type ShippingProviderId } from '../lib/shipping';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

type PaymentMethod = 'mercadopago' | 'transfer' | 'presencial';

const METHODS: { id: PaymentMethod; icon: React.ReactNode; label: string; sub: string }[] = [
  {
    id: 'mercadopago',
    icon: <CreditCard className="w-5 h-5" />,
    label: 'MercadoPago',
    sub: 'Tarjeta · Débito · Cuotas',
  },
  {
    id: 'transfer',
    icon: <Banknote className="w-5 h-5" />,
    label: 'Transferencia',
    sub: 'Reserva por WhatsApp',
  },
  {
    id: 'presencial',
    icon: <Users className="w-5 h-5" />,
    label: 'Presencial',
    sub: 'San Joaquín · Metro Pedrero L5',
  },
];

const METHOD_INFO: Record<PaymentMethod, string> = {
  mercadopago:
    'Serás redirigido a MercadoPago. Acepta tarjetas de crédito/débito, cuotas y billetera MP. 100% seguro.',
  transfer:
    'Irás a WhatsApp con el resumen del pedido. Te enviamos los datos bancarios para transferir y confirmamos tu reserva.',
  presencial:
    'Retiro en San Joaquín, a pasos del Metro Pedrero Línea 5. Pagas en efectivo o tarjeta al momento del retiro.',
};

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isCartOpen,
    closeCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mercadopago');
  const [loadingMp, setLoadingMp] = useState(false);
  const [wantsShipping, setWantsShipping] = useState(false);
  const [shippingProvider, setShippingProvider] = useState<ShippingProviderId>('blue-express');

  // Retiro presencial nunca paga despacho
  const shippingRequested = wantsShipping && paymentMethod !== 'presencial';
  const freeShipping = shippingRequested && totalPrice > FREE_SHIPPING_THRESHOLD;
  const shippingApplies = shippingRequested && !freeShipping;
  const shippingCost = shippingApplies ? SHIPPING_COST : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleSetPaymentMethod = (m: PaymentMethod) => {
    setPaymentMethod(m);
    if (m === 'presencial') setWantsShipping(false);
  };

  const buildWaLink = useCallback(
    (method: PaymentMethod) => {
      if (items.length === 0)
        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! Me gustaría hacer una consulta.')}`;

      let message = `Hola Candy's Pet! 🐾 Me gustaría reservar:\n\n`;
      for (const item of items) {
        message += `- ${item.quantity}x ${item.name}`;
        if (item.size) message += ` (Talla: ${item.size})`;
        if (item.color) message += ` (Color: ${item.color})`;
        message += ` — $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
      }
      if (shippingRequested) {
        const provider = SHIPPING_PROVIDERS.find((option) => option.id === shippingProvider);
        message += freeShipping
          ? `- Despacho con ${provider?.name ?? 'transportista seleccionado'} — GRATIS (compra sobre $49.900)\n`
          : `- Despacho con ${provider?.name ?? 'transportista seleccionado'} — $${SHIPPING_COST.toLocaleString('es-CL')}\n`;
      }
      message += `\nTotal: $${grandTotal.toLocaleString('es-CL')}\n`;

      if (method === 'transfer') {
        message += `\n💸 Método de pago: Transferencia bancaria\nQuedo atento/a para recibir los datos y coordinar. ✨`;
      } else if (method === 'presencial') {
        message += `\n🤝 Método de pago: Retiro presencial en San Joaquín (Metro Pedrero L5)\nQuedo atento/a para coordinar el retiro. ✨`;
      } else {
        message += `\n💳 Método de pago: MercadoPago\nQuedo atento/a para coordinar. ✨`;
      }

      return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    },
    [items, grandTotal, freeShipping, shippingRequested, shippingProvider],
  );

  const handleMpCheckout = useCallback(async () => {
    setLoadingMp(true);
    try {
      const res = await fetch(`${BASE}/api/payment/preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            ...items.map((item) => ({
              productId: item.productId,
              title: [item.name, item.size && `Talla ${item.size}`, item.color].filter(Boolean).join(' · '),
              quantity: item.quantity,
              unit_price: item.price,
              currency_id: 'CLP',
              size: item.size ?? 'M',
              color: item.color,
            })),
            ...(shippingApplies ? [{
              productId: 'shipping',
              title: `Despacho con ${SHIPPING_PROVIDERS.find((option) => option.id === shippingProvider)?.name ?? 'transportista seleccionado'}`,
              quantity: 1,
              unit_price: shippingCost,
              currency_id: 'CLP',
            }] : []),
          ],
          back_url: window.location.origin + import.meta.env.BASE_URL,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'MP_NOT_CONFIGURED') {
          window.open(buildWaLink('mercadopago'), '_blank');
          closeCart();
          toast.info('MercadoPago aún no está activado. Te redirigimos a WhatsApp para coordinar.');
          return;
        }
        if (data.error === 'OUT_OF_STOCK') {
          toast.error(`Sin stock: ${data.message}`, { duration: 6000 });
          return;
        }
        throw new Error(data.message ?? 'Error desconocido');
      }

      // Redirect to MercadoPago Checkout Pro
      window.location.href = data.init_point as string;
    } catch (err) {
      console.error('MP checkout error:', err);
      toast.error('No se pudo iniciar el pago. Redirigiendo a WhatsApp…');
      window.open(buildWaLink('mercadopago'), '_blank');
      closeCart();
    } finally {
      setLoadingMp(false);
    }
  }, [items, buildWaLink, closeCart, shippingApplies, shippingCost, shippingProvider]);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-background z-[101] shadow-2xl flex flex-col border-l border-border"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-border bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-heading font-bold">Tu Carrito</h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5 bg-muted/30 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                    <p className="text-lg font-medium text-foreground mb-2">Tu carrito está vacío</p>
                    <p className="text-sm text-muted-foreground">
                      ¡Agrega algunos slings increíbles para tu mascota!
                    </p>
                    <button
                      onClick={() => {
                        closeCart();
                        document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
                    >
                      Ir al catálogo
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl flex gap-4 border border-border/50 shadow-sm"
                    >
                      {item.image && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-bold text-sm leading-tight text-foreground">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs text-muted-foreground mb-2 flex gap-2">
                          {item.size && <span>Talla: {item.size}</span>}
                          {item.size && item.color && <span>·</span>}
                          {item.color && <span>{item.color}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1 border border-border/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:text-primary shadow-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:text-primary shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-primary text-sm">
                            ${(item.price * item.quantity).toLocaleString('es-CL')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout panel */}
              {items.length > 0 && (
                <div className="p-5 bg-white border-t border-border shadow-[0_-10px_20px_rgba(0,0,0,0.03)] space-y-4">
                  {/* Shipping toggle */}
                  {paymentMethod !== 'presencial' ? (
                    <button
                      onClick={() => setWantsShipping(v => !v)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                        wantsShipping
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-muted/30 text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        🚚 Agregar despacho
                        <span className="text-xs font-normal text-muted-foreground">a todo Chile</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-bold">
                          {totalPrice > FREE_SHIPPING_THRESHOLD ? 'Gratis' : '+$3.500'}
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            wantsShipping ? 'bg-primary border-primary' : 'border-border'
                          }`}
                        >
                          {wantsShipping && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                      📍 <span className="font-semibold text-foreground">Retiro</span> San Joaquín · a pasos Metro Pedrero Línea 5
                    </div>
                  )}

                  {wantsShipping && (
                    <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Medio de despacho · fuera de la VI Región
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {SHIPPING_PROVIDERS.map((provider) => (
                          <button
                            key={provider.id}
                            type="button"
                            onClick={() => setShippingProvider(provider.id)}
                            className={`flex min-h-[62px] flex-col items-center justify-center gap-1 rounded-lg border bg-white px-1.5 py-2 transition ${
                              shippingProvider === provider.id
                                ? 'border-primary ring-2 ring-primary/15'
                                : 'border-border hover:border-primary/40'
                            }`}
                            aria-label={`Elegir ${provider.name}`}
                          >
                            <img
                              src={provider.logo}
                              alt={provider.name}
                              className={`${provider.logoClassName} w-auto object-contain`}
                            />
                            <span className="text-[9px] font-semibold text-foreground">{provider.name}</span>
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                        Despachamos fuera de la VI Región y a todo Chile. Gratis en compras superiores a $49.900.
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Productos</span>
                      <span>${totalPrice.toLocaleString('es-CL')}</span>
                    </div>
                    {shippingRequested && (
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Despacho</span>
                        <span>
                          {freeShipping ? 'Gratis' : `+$${SHIPPING_COST.toLocaleString('es-CL')}`}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1 border-t border-border/50">
                      <span className="text-muted-foreground text-sm">Total</span>
                      <span className="text-2xl font-bold font-heading">
                        ${grandTotal.toLocaleString('es-CL')}
                      </span>
                    </div>
                  </div>

                  {/* Payment selector */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Método de pago
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {METHODS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => handleSetPaymentMethod(m.id)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            paymentMethod === m.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-primary/40 text-muted-foreground'
                          }`}
                        >
                          {m.icon}
                          <span className="text-[11px] font-bold leading-tight">{m.label}</span>
                          <span className="text-[9px] leading-tight opacity-70 hidden sm:block">{m.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Method description */}
                  <div className="text-xs text-muted-foreground bg-muted/40 rounded-xl px-4 py-3 leading-relaxed">
                    {METHOD_INFO[paymentMethod]}
                  </div>

                  {/* CTA */}
                  {paymentMethod === 'mercadopago' ? (
                    <button
                      onClick={handleMpCheckout}
                      disabled={loadingMp}
                      className="w-full py-4 rounded-full font-bold text-base text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: loadingMp ? '#aaa' : '#009ee3',
                        boxShadow: loadingMp ? 'none' : '0 8px 24px #009ee340',
                      }}
                    >
                      {loadingMp ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Procesando…
                        </span>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Pagar con MercadoPago
                        </>
                      )}
                    </button>
                  ) : (
                    <a
                      href={buildWaLink(paymentMethod)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeCart}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
                    >
                      {paymentMethod === 'transfer' ? (
                        <><Banknote className="w-5 h-5" /> Reservar · Coordinar transferencia</>
                      ) : (
                        <><Users className="w-5 h-5" /> Reservar · Coordinar retiro</>
                      )}
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
