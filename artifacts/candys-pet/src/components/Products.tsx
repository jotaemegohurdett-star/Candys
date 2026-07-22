import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';

const products = [
  {
    id: "p1",
    name: "Sling Clásico Rosa",
    price: 35000,
    description: "Nuestro modelo insignia. Tela de algodón suave y transpirable, ideal para el día a día. Incluye gancho de seguridad para el collar.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    colors: ["Rosa Pastel", "Beige"],
    sizes: ["S", "M", "L"],
    features: ["Algodón 100%", "Lavable a máquina", "Soporta hasta 8kg", "Bolsillo para celular"]
  },
  {
    id: "p2",
    name: "Sling Acolchado Invierno",
    price: 42000,
    description: "Diseñado para los días fríos. Interior de chiporro sintético súper suave. Tu mascota no querrá salir de él.",
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80",
    colors: ["Gris Marengo", "Azul Marino"],
    sizes: ["S", "M", "L"],
    features: ["Interior térmico", "Exterior impermeable", "Correa ajustable acolchada", "Bolsillo interior"]
  },
  {
    id: "p3",
    name: "Sling Sport Malla",
    price: 32000,
    description: "Perfecto para el verano y climas cálidos. Confeccionado con malla resistente y ultra respirable.",
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
    colors: ["Celeste Aqua", "Negro"],
    sizes: ["S", "M"],
    features: ["Malla 3D respirable", "Ultra liviano", "Secado rápido", "Base reforzada"]
  },
  {
    id: "p4",
    name: "Bolso de Transporte Premium",
    price: 55000,
    description: "Para viajes más largos o uso en cabina de avión. Estructura semi-rígida pero cómoda.",
    image: "https://images.unsplash.com/photo-1601758177266-bc5f38a5b285?auto=format&fit=crop&w=600&q=80",
    colors: ["Beige", "Gris Oscuro"],
    sizes: ["Única (hasta 10kg)"],
    features: ["Aprobado para cabina", "Malla en 3 lados", "Base rígida removible", "Correa al hombro"]
  }
];

export function Products() {
  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Nuestra <span className="text-primary italic">Colección</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Descubre el sling perfecto para ti y tu mascota. Cada pieza está elaborada a mano con atención al más mínimo detalle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: any, index: number }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            <div className="absolute bottom-4 right-4 bg-white text-foreground p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold font-heading mb-2">{product.name}</h3>
            <p className="text-primary font-bold text-lg mb-4">
              ${product.price.toLocaleString('es-CL')}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
              {product.description}
            </p>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-none">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[600px]">
          <div className="w-full md:w-1/2 bg-muted relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-3xl md:text-4xl mb-2">{product.name}</DialogTitle>
              <div className="text-2xl font-bold text-primary mb-4">
                ${product.price.toLocaleString('es-CL')}
              </div>
              <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-muted-foreground">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedColor === color 
                          ? 'bg-foreground text-background shadow-md' 
                          : 'bg-white border border-border hover:border-foreground/30 text-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Talla</h4>
                  <button 
                    onClick={() => document.querySelector('#size-guide')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Ver guía de tallas
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        selectedSize === size 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'bg-white border border-border hover:border-primary/50 text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-muted-foreground">Características</h4>
                <ul className="space-y-2">
                  {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-border">
              <button
                onClick={(e) => {
                  handleAddToCart(e);
                  // Optional: Show a toast here
                }}
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
