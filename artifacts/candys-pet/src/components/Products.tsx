import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Star, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { useStock } from '../hooks/useStock';
import { useCatalog } from '../hooks/useCatalog';
import { waLink, scrollToId } from '../lib/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';
import p1Img from '@assets/Screenshot_20260722-051400_WhatsApp~2_1784713749406.jpg';
import p2Img from '@assets/Screenshot_20260722-005735_Instagram~2_1784698640108.jpg';
import p3Img from '@assets/Screenshot_20260722-051510_WhatsApp_1784713749468.jpg';
import p4Img from '@assets/Screenshot_20260722-051201_WhatsApp~2_1784713749256.jpg';

/** Fallback local images used when no image is uploaded via admin panel */
const LOCAL_IMAGES: Record<string, string> = {
  p1: p1Img,
  p2: p2Img,
  p3: p3Img,
  p4: p4Img,
};

const SIZE_INFO: Record<string, string> = {
  M: 'Desde 2 meses · hasta 3,5 kg',
  L: 'Hasta 10 kg · caben 2 perritos 🐾🐾',
};

const products = [
  {
    id: 'p1',
    name: 'Porta Mascota Clásico',
    badge: 'Más vendido',
    badgeStyle: { background: 'linear-gradient(135deg, hsl(340 84% 50%), hsl(340 84% 40%))' },
    description:
      'Nuestro modelo insignia tipo sling. Tela de algodón suave y transpirable, ideal para el día a día. Incluye gancho de seguridad interior. Perfecto también para perritos senior o con movilidad reducida 🧡',
    image: p1Img,
    imgPosition: 'center 18%',
    colors: ['Rosa', 'Rosa Chicle', 'Lila', 'Azul Cielo', 'Azul Rey', 'Negro', 'Gris', 'Marino'],
    colorSwatches: ['#F9A8C9', '#FF69B4', '#C3A6E8', '#87CEEB', '#4169E1', '#222222', '#9E9E9E', '#1B2A4A'],
    features: [
      'Tela algodón 100% transpirable',
      'Lavable a máquina 30°',
      'Gancho de seguridad interior',
      'Ideal para perritos senior o con discapacidad',
      'Reduce el estrés y la ansiedad de tu mascota',
      'Talla M: desde 2 meses hasta 3,5 kg',
      'Talla L: hasta 10 kg — caben 2 perritos',
    ],
  },
  {
    id: 'p2',
    name: 'Porta Mascota Corderito',
    badge: 'Colección Invierno',
    badgeStyle: { background: 'linear-gradient(135deg, hsl(200 70% 45%), hsl(200 70% 35%))' },
    description:
      'Interior de corderito (chiporro sintético) extra suave y cálido. Perfecto para días fríos. Tu regalón no querrá salir. Ideal para uso terapéutico, perritos senior o con movilidad reducida.',
    image: p2Img,
    imgPosition: 'center 20%',
    colors: ['Azul Marino', 'Gris Marengo', 'Negro', 'Azul Celeste', 'Café'],
    colorSwatches: ['#1B2A4A', '#4A4A4A', '#111111', '#6BBFDF', '#7B5C3E'],
    features: [
      'Interior corderito ultra suave',
      'Exterior tela resistente',
      'Correa ajustable acolchada',
      'Ideal para perritos senior — uso terapéutico',
      'Reduce ansiedad y estrés',
      'Talla M: desde 2 meses hasta 3,5 kg',
      'Talla L: hasta 10 kg — caben 2 perritos',
    ],
  },
  {
    id: 'p3',
    name: 'Porta Mascota Estampado',
    badge: 'Edición especial',
    badgeStyle: { background: 'linear-gradient(135deg, hsl(270 60% 55%), hsl(270 60% 45%))' },
    description:
      'Diseños únicos con estampados florales, animal print y motivos especiales. Colaboraciones exclusivas con @ClubChihuauaChile y @club_poodlechile. Mismo nivel de confort y seguridad.',
    image: p3Img,
    imgPosition: 'center 15%',
    colors: ['Floral Rosa', 'Floral Azul', 'Animal Print', 'Patitas', 'Mickey'],
    colorSwatches: ['#F9A8C9', '#87CEEB', '#8B5E3C', '#FF69B4', '#1B2A4A'],
    features: [
      "Diseños exclusivos Candy's Pet",
      'Tela con estampado fijo · lavable a mano',
      'Gancho de seguridad interior',
      'Apto para perritos con discapacidad o senior',
      'Edición limitada',
      'Talla M: desde 2 meses hasta 3,5 kg',
      'Talla L: hasta 10 kg — caben 2 perritos',
    ],
  },
  {
    id: 'p4',
    name: 'Porta Mascota Unisex',
    badge: 'Para todos',
    badgeStyle: { background: 'linear-gradient(135deg, hsl(186 96% 38%), hsl(186 96% 30%))' },
    description:
      'Diseño unisex, ideal para hombres y mujeres. Cómodo, transpirable y resistente. ¡En talla L transportas dos perritos pequeños al mismo tiempo! Muy usado con perritos senior.',
    image: p4Img,
    imgPosition: 'center 25%',
    colors: ['Negro', 'Gris', 'Marino', 'Café'],
    colorSwatches: ['#111111', '#9E9E9E', '#1B2A4A', '#7B5C3E'],
    features: [
      'Diseño unisex versátil',
      'Doble bolsillo lateral',
      'Capacidad talla L: 2 mascotas pequeñas 🐾🐾',
      'Correa reforzada extra larga',
      'Malla transpirable en zona mascota',
      'Talla M: desde 2 meses hasta 3,5 kg',
      'Talla L: hasta 10 kg — caben 2 perritos',
    ],
  },
];

export function Products() {
  const stock = useStock();
  const catalog = useCatalog();

  const priceM = catalog.getPrice('M');
  const priceL = catalog.getPrice('L');

  return (
    <section id="products" className="py-24" style={{ background: 'hsl(220 25% 9%)' }}>
      <div className="container mx-auto px-6 sm:px-10">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ background: 'hsl(340 84% 50% / 0.15)', color: 'hsl(340 84% 65%)' }}
            >
              Catálogo
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Nuestra{' '}
              <span className="italic" style={{ color: 'hsl(340 84% 65%)' }}>
                Colección
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:items-end gap-1"
          >
            <div className="flex gap-3">
              <span
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: 'hsl(340 84% 50%)' }}
              >
                Talla M · ${priceM.toLocaleString('es-CL')}
              </span>
              <span
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: 'hsl(270 70% 55%)' }}
              >
                Talla L · ${priceL.toLocaleString('es-CL')}
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Cada porta mascota elaborado a mano con amor 💕
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} stock={stock} catalog={catalog} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl"
          style={{ background: 'hsl(220 25% 12%)', border: '1px solid hsl(220 25% 18%)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              ¿No encuentras tu color favorito? ¡Lo hacemos a pedido para ti!
            </p>
          </div>
          <a
            href="https://wa.me/56936693300?text=Hola!%20Quisiera%20consultar%20sobre%20un%20porta%20mascota%20personalizado%20%F0%9F%90%BE"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'hsl(340 84% 50%)', boxShadow: '0 4px 20px hsl(340 84% 50% / 0.35)' }}
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  stock,
  catalog,
}: {
  product: (typeof products)[0];
  index: number;
  stock: ReturnType<typeof useStock>;
  catalog: ReturnType<typeof useCatalog>;
}) {
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<'M' | 'L'>('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Dynamic price from DB, fallback to local constant
  const currentPrice = catalog.getPrice(selectedSize);
  // Dynamic image from admin panel, fallback to bundled asset
  const displayImage = catalog.getPrimaryImage(product.id) ?? LOCAL_IMAGES[product.id];

  const outOfStock = stock.isOutOfStock(product.id, selectedSize);
  const lowStock = stock.isLowStock(product.id, selectedSize);
  const qtyLeft = stock.getQty(product.id, selectedSize);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x: y, y: x });
  };

  const handleAddToCart = () => {
    if (outOfStock) {
      toast.error('Sin stock disponible para esta talla 😔', { duration: 4000 });
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: displayImage,
      size: selectedSize,
      color: selectedColor,
    });
    toast.success('¡Agregado al carrito! 🐾', {
      description: `${product.name} · Talla ${selectedSize} · ${selectedColor}`,
      action: { label: 'Ver carrito', onClick: openCart },
      duration: 4000,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Scroll-in wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
        >
          {/* Tilt wrapper */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            style={{ transformPerspective: 900, background: 'hsl(220 25% 12%)', borderColor: 'hsl(220 25% 18%)' }}
            className="group cursor-pointer flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col h-full">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: product.imgPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                  style={product.badgeStyle}
                >
                  {product.badge}
                </div>

                {/* Quick-add hover button */}
                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <ShoppingBag className="w-5 h-5 text-gray-900" />
                </div>

                {/* Stars bottom-left of image */}
                <div className="absolute bottom-4 left-4 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* AGOTADO overlay — ambas tallas sin stock */}
                {stock.isOutOfStock(product.id, 'M') && stock.isOutOfStock(product.id, 'L') ? (
                  <>
                    {/* Dim overlay */}
                    <div className="absolute inset-0 bg-black/55" />
                    {/* Badge central */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase text-white border-2 border-white/80"
                        style={{ background: 'hsl(0 72% 42%)', letterSpacing: '0.2em', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
                        AGOTADO
                      </span>
                    </div>
                  </>
                ) : (stock.isLowStock(product.id, 'M') || stock.isLowStock(product.id, 'L')) ? (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1"
                    style={{ background: 'hsl(38 92% 40%)' }}>
                    <AlertTriangle className="w-2.5 h-2.5" /> Últimas unidades
                  </div>
                ) : null}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-white text-lg font-bold mb-1">{product.name}</h3>

                {/* Price range — dynamic from DB */}
                <p className="text-sm font-bold mb-3" style={{ color: 'hsl(340 84% 62%)' }}>
                  Desde ${catalog.getPrice('M').toLocaleString('es-CL')}
                </p>

                {/* Color dots */}
                <div className="flex gap-1.5 mt-auto items-center">
                  {product.colorSwatches.slice(0, 6).map((hex, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125"
                      style={{ background: hex }}
                    />
                  ))}
                  {product.colorSwatches.length > 6 && (
                    <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      +{product.colorSwatches.length - 6}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </DialogTrigger>

      {/* Detail modal */}
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row max-h-[92vh] md:max-h-[640px]">

          {/* Image panel */}
          <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[280px]">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover absolute inset-0"
              style={{ objectPosition: product.imgPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <div
              className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
              style={product.badgeStyle}
            >
              {product.badge}
            </div>
            {/* AGOTADO en modal — talla seleccionada sin stock */}
            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="px-6 py-2.5 rounded-full font-black tracking-widest uppercase text-white border-2 border-white/80 text-sm"
                  style={{ background: 'hsl(0 72% 42%)', letterSpacing: '0.2em', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
                  AGOTADO
                </span>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="font-heading text-3xl md:text-4xl mb-2 text-gray-900">
                {product.name}
              </DialogTitle>

              {/* Dynamic price */}
              <div className="text-2xl font-bold mb-1" style={{ color: 'hsl(340 84% 50%)' }}>
                ${currentPrice.toLocaleString('es-CL')}
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-gray-400 ml-1.5 self-center">5.0 · Clientes felices</span>
              </div>
              <DialogDescription className="text-base text-gray-600 leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mb-8">
              {/* Color picker */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">
                  Color —{' '}
                  <span className="text-gray-700 normal-case font-semibold">{selectedColor}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      aria-label={`Color: ${color}${selectedColor === color ? ' (seleccionado)' : ''}`}
                      aria-pressed={selectedColor === color}
                      className="w-8 h-8 rounded-full border-2 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
                      style={{
                        background: product.colorSwatches[i],
                        borderColor: selectedColor === color ? '#111' : 'transparent',
                        transform: selectedColor === color ? 'scale(1.18)' : 'scale(1)',
                        boxShadow: selectedColor === color ? '0 0 0 3px white, 0 0 0 5px #111' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size picker */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Talla</h4>
                  <button
                    onClick={() => scrollToId('size-guide')}
                    className="text-xs font-medium hover:underline"
                    style={{ color: 'hsl(340 84% 50%)' }}
                  >
                    Ver guía de tallas →
                  </button>
                </div>
                <div className="flex gap-3">
                  {(['M', 'L'] as const).map((size) => {
                    const oos = stock.isOutOfStock(product.id, size);
                    const low = stock.isLowStock(product.id, size);
                    const qty = stock.getQty(product.id, size);
                    return (
                      <button
                        key={size}
                        onClick={() => !oos && setSelectedSize(size)}
                        disabled={oos}
                        className="flex flex-col items-center px-5 py-3 rounded-2xl border-2 transition-all text-left relative"
                        style={
                          oos
                            ? { background: '#f5f5f5', borderColor: '#e5e7eb', color: '#aaa', cursor: 'not-allowed', opacity: 0.6 }
                            : selectedSize === size
                              ? { background: 'hsl(340 84% 50%)', borderColor: 'transparent', color: 'white', boxShadow: '0 4px 16px hsl(340 84% 50% / 0.4)' }
                              : { background: 'white', borderColor: '#e5e7eb', color: '#374151' }
                        }
                      >
                        <span className="text-lg font-black leading-none">{size}</span>
                        <span className="text-[10px] font-bold mt-1 opacity-80">
                          ${catalog.getPrice(size).toLocaleString('es-CL')}
                        </span>
                        <span className="text-[9px] mt-0.5 leading-tight max-w-[80px] text-center opacity-65">
                          {SIZE_INFO[size]}
                        </span>
                        {oos ? (
                          <span className="text-[9px] mt-1 font-bold text-red-400">Sin stock</span>
                        ) : low ? (
                          <span className="text-[9px] mt-1 font-bold" style={{ color: 'hsl(38 92% 45%)' }}>
                            ¡Solo {qty}!
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">
                  Características
                </h4>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'hsl(186 96% 43% / 0.12)' }}
                      >
                        <Check className="w-3 h-3" style={{ color: 'hsl(186 96% 38%)' }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
              {/* Stock status */}
              {outOfStock ? (
                <div className="flex items-center gap-2 text-sm font-medium text-red-500 bg-red-50 rounded-xl px-4 py-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Sin stock para talla {selectedSize}. Consúltanos por WhatsApp.
                </div>
              ) : lowStock ? (
                <div className="flex items-center gap-2 text-sm font-medium bg-amber-50 rounded-xl px-4 py-2.5"
                  style={{ color: 'hsl(38 92% 38%)' }}>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  ¡Solo quedan {qtyLeft} unidades en talla {selectedSize}!
                </div>
              ) : null}

              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="btn-shimmer w-full py-4 rounded-full font-bold text-base text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: outOfStock ? '#aaa' : 'linear-gradient(135deg, hsl(340 84% 52%), hsl(340 84% 43%))',
                  boxShadow: outOfStock ? 'none' : '0 8px 28px hsl(340 84% 50% / 0.35)',
                }}
              >
                <ShoppingBag className="w-5 h-5" />
                {outOfStock ? 'Sin stock' : `Agregar al Carrito — $${currentPrice.toLocaleString('es-CL')}`}
              </button>
              <a
                href={waLink('Hola! Me interesa el porta mascota y quisiera más información 🐾')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full font-semibold text-sm text-center border border-gray-200 text-gray-700 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
              >
                📱 Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
