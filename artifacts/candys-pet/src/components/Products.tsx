import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';
import p1Img from '@assets/Screenshot_20260722-005620_Instagram_1784696503686.jpg';
import p2Img from '@assets/Screenshot_20260722-005908_Instagram_1784696502984.jpg';
import p3Img from '@assets/Screenshot_20260722-005601_Instagram_1784696503852.jpg';
import p4Img from '@assets/Screenshot_20260722-005653_Instagram_1784696503335.jpg';

const products = [
  {
    id: 'p1',
    name: 'Porta Mascota Clásico',
    badge: 'Más vendido',
    price: 35000,
    description:
      'Nuestro modelo insignia tipo banano. Tela de algodón suave y transpirable, ideal para el día a día. Incluye gancho de seguridad interior para el collar de tu peludo.',
    image: p1Img,
    imgPosition: 'center 22%',
    colors: ['Rosa', 'Rosa Chicle', 'Lila', 'Azul Cielo', 'Azul Rey', 'Negro', 'Gris', 'Marino'],
    colorSwatches: ['#F9A8C9', '#FF69B4', '#C3A6E8', '#87CEEB', '#4169E1', '#222222', '#9E9E9E', '#1B2A4A'],
    sizes: ['S', 'M', 'L'],
    features: [
      'Tela algodón 100% transpirable',
      'Lavable a máquina 30°',
      'Soporta hasta 8 kg',
      'Gancho de seguridad interior',
      'Apto para perros y gatos',
    ],
  },
  {
    id: 'p2',
    name: 'Porta Mascota Corderito',
    badge: 'Colección Invierno',
    price: 42000,
    description:
      'Interior de corderito (chiporro sintético) extra suave y cálido. Perfecto para días fríos. Tu regalón no querrá salir. Exterior liso y resistente.',
    image: p2Img,
    imgPosition: 'center 38%',
    colors: ['Azul Marino', 'Gris Marengo', 'Negro', 'Azul Celeste', 'Café'],
    colorSwatches: ['#1B2A4A', '#4A4A4A', '#111111', '#6BBFDF', '#7B5C3E'],
    sizes: ['S', 'M', 'L'],
    features: [
      'Interior corderito ultra suave',
      'Exterior tela resistente',
      'Correa ajustable acolchada',
      'Soporta hasta 10 kg',
      'Ideal para invierno',
    ],
  },
  {
    id: 'p3',
    name: 'Porta Mascota Estampado',
    badge: 'Edición especial',
    price: 38000,
    description:
      'Diseños únicos con estampados florales, animal print y motivos especiales. Colaboraciones exclusivas con @ClubChihuauaChile y @club_poodlechile.',
    image: p3Img,
    imgPosition: 'center 20%',
    colors: ['Floral Rosa', 'Floral Azul', 'Animal Print', 'Patitas', 'Mickey'],
    colorSwatches: ['#F9A8C9', '#87CEEB', '#8B5E3C', '#FF69B4', '#1B2A4A'],
    sizes: ['S', 'M', 'L'],
    features: [
      'Diseños exclusivos Candy\'s Pet',
      'Tela con estampado fijo',
      'Lavable a mano',
      'Soporta hasta 8 kg',
      'Edición limitada',
    ],
  },
  {
    id: 'p4',
    name: 'Porta Mascota Unisex',
    badge: 'Para todos',
    price: 35000,
    description:
      'Diseño unisex, ideal para hombres y mujeres. Cómodo, transpirable y resistente. ¡Transporta incluso dos perritos pequeños al mismo tiempo!',
    image: p4Img,
    imgPosition: 'center 42%',
    colors: ['Negro', 'Gris', 'Marino', 'Café'],
    colorSwatches: ['#111111', '#9E9E9E', '#1B2A4A', '#7B5C3E'],
    sizes: ['S', 'M', 'L'],
    features: [
      'Diseño unisex versátil',
      'Doble bolsillo lateral',
      'Capacidad para 2 mascotas pequeñas',
      'Correa reforzada extra larga',
      'Malla transpirable en zona mascota',
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="py-24 bg-[hsl(220_25%_9%)]">
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-base max-w-xs md:text-right leading-relaxed"
          >
            Cada porta mascota elaborado a mano con atención al más mínimo detalle.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-white/10 bg-white/5"
        >
          <p className="text-white/70 text-sm">
            ¿No encuentras tu talla o color? ¡Escríbenos y lo hacemos a pedido!
          </p>
          <a
            href="https://wa.me/56936693300?text=Hola!%20Quisiera%20consultar%20sobre%20un%20porta%20mascota%20personalizado%20%F0%9F%90%BE"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'hsl(340 84% 50%)' }}
          >
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="group cursor-pointer flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl"
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: product.imgPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: 'hsl(340 84% 50%)' }}
            >
              {product.badge}
            </div>

            {/* Hover cart icon */}
            <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
            </div>
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-heading text-white text-lg font-bold mb-1">{product.name}</h3>
            <p className="text-sm font-bold mb-3" style={{ color: 'hsl(340 84% 60%)' }}>
              ${product.price.toLocaleString('es-CL')}
            </p>
            {/* Color dots preview */}
            <div className="flex gap-1.5 mt-auto">
              {product.colorSwatches.slice(0, 5).map((hex, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ background: hex }}
                />
              ))}
              {product.colorSwatches.length > 5 && (
                <span className="text-white/40 text-xs self-center ml-1">
                  +{product.colorSwatches.length - 5}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      {/* Detail modal */}
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-3xl">
        <div className="flex flex-col md:flex-row max-h-[92vh] md:max-h-[640px]">
          {/* Image panel */}
          <div className="w-full md:w-1/2 relative bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover absolute inset-0"
              style={{ objectPosition: product.imgPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div
              className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: 'hsl(340 84% 50%)' }}
            >
              {product.badge}
            </div>
          </div>

          {/* Info panel */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="font-heading text-3xl md:text-4xl mb-2 text-gray-900">
                {product.name}
              </DialogTitle>
              <div className="text-2xl font-bold mb-4" style={{ color: 'hsl(340 84% 50%)' }}>
                ${product.price.toLocaleString('es-CL')}
              </div>
              <DialogDescription className="text-base text-gray-600 leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mb-8">
              {/* Color picker */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">
                  Color — <span className="text-gray-700 normal-case font-semibold">{selectedColor}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'
                      }`}
                      style={{ background: product.colorSwatches[i] }}
                    />
                  ))}
                </div>
              </div>

              {/* Size picker */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Talla</h4>
                  <button
                    onClick={() => document.querySelector('#size-guide')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs font-medium hover:underline"
                    style={{ color: 'hsl(340 84% 50%)' }}
                  >
                    Ver guía de tallas →
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                        selectedSize === size
                          ? 'text-white border-transparent shadow-md'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                      style={selectedSize === size ? { background: 'hsl(340 84% 50%)', borderColor: 'transparent' } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">Características</h4>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 shrink-0" style={{ color: 'hsl(186 96% 43%)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full font-bold text-base text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                style={{ background: added ? 'hsl(142 72% 45%)' : 'hsl(340 84% 50%)', boxShadow: '0 8px 24px hsl(340 84% 50% / 0.3)' }}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> ¡Agregado al carrito!</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Agregar al Carrito</>
                )}
              </button>
              <a
                href="https://wa.me/56936693300?text=Hola!%20Me%20interesa%20el%20porta%20mascota%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20%F0%9F%90%BE"
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
