import React, { useEffect } from 'react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import p1Img from '@assets/Screenshot_20260722-051400_WhatsApp~2_1784713749406.jpg';
import p2Img from '@assets/Screenshot_20260722-005735_Instagram~2_1784698640108.jpg';
import p4Img from '@assets/Screenshot_20260722-051201_WhatsApp~2_1784713749256.jpg';
import { HOME_SEO, applySeo } from '../lib/seo';

type ProductSeo = {
  path: string;
  name: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  details: string[];
};

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  classic: {
    path: '/productos/porta-mascota-clasico',
    name: 'Porta Mascota Tipo Banano Clásico',
    title: 'Porta Mascota Tipo Banano en Chile | Candy’s Pet',
    description:
      'Porta mascota tipo banano en Chile para perros y gatos pequeños. Bolsos manos libres y porta mascotas de tela artesanales. Tallas M y L.',
    image: p1Img,
    imageAlt:
      'Porta mascota tipo banano clásico para perros y gatos, bolso manos libres hecho a mano en Chile',
    details: [
      'Tela de algodón suave, liviana y transpirable',
      'Gancho de seguridad interior',
      'Talla M hasta 3,5 kg y talla L hasta 10 kg',
      'Ideal para paseos, transporte público y mascotas senior',
    ],
  },
  bomber: {
    path: '/productos/porta-mascota-bomber-cafe',
    name: 'Porta Mascota Tipo Banano Tela Bomber Color Café',
    title: 'Porta Mascota Bomber Café en Chile | Candy’s Pet',
    description:
      'Porta mascota tipo banano de tela bomber color café en Chile para perros y gatos. Bolso manos libres cómodo y artesanal.',
    image: p2Img,
    imageAlt:
      'Porta mascota tipo banano de tela bomber color café para perros y gatos, bolso manos libres',
    details: [
      'Tela semi elastizada, suave y liviana',
      'Repelente a lloviznas y para todas las temporadas',
      'Forro interior de algodón transpirable',
      'Talla M hasta 3,5 kg y talla L hasta 10 kg',
    ],
  },
  unisex: {
    path: '/productos/porta-mascota-unisex',
    name: 'Porta Mascota Tipo Banano Unisex',
    title: 'Porta Mascota Tipo Banano Unisex en Chile | Candy’s Pet',
    description:
      'Porta mascota tipo banano unisex en Chile para perros y gatos pequeños. Bolsos manos libres y porta mascotas de tela artesanales.',
    image: p4Img,
    imageAlt:
      'Porta mascota tipo banano unisex para perros y gatos, bolso manos libres resistente hecho en Chile',
    details: [
      'Diseño cómodo y versátil para hombres y mujeres',
      'Correa reforzada extra larga',
      'Tela transpirable en la zona de la mascota',
      'En talla L pueden ir 2 mascotas pequeñas',
    ],
  },
};

export function ProductLandingPage({ product }: { product: ProductSeo }) {
  useEffect(() => {
    applySeo(product);
    window.scrollTo(0, 0);
    return () => applySeo(HOME_SEO);
  }, [product]);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="border-b border-border/60 bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4 sm:px-10">
          <Link href="/" className="font-heading text-xl font-bold">
            Candy's <span className="italic text-pink-500">Pet</span>
          </Link>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver catálogo
          </Link>
        </div>
      </header>

      <main>
        <section className="container mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center md:py-20 sm:px-10">
          <div className="overflow-hidden rounded-3xl bg-muted shadow-xl">
            <img
              src={product.image}
              alt={product.imageAlt}
              className="aspect-[4/5] w-full object-cover"
              width="900"
              height="1125"
              fetchPriority="high"
            />
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-pink-500">
              Candy's Pet · Hecho a mano en Chile
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

            <h2 className="mt-9 font-heading text-2xl font-bold">
              Bolsos manos libres para perros y gatos
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Lleva a tu mascota cerca de ti con un porta mascota tipo banano cómodo, seguro y
              práctico para paseos, viajes y transporte público.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              También puedes encontrar este formato como bandolera para perros, bolso porta mascotas,
              cangurera para perros o banano para mascotas: una alternativa artesanal para mantener
              tus manos libres.
            </p>

            <ul className="mt-6 space-y-3">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="font-bold text-pink-500">✓</span>
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Quiero%20consultar%20por%20este%20porta%20mascota."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
              <a
                href="mailto:contacto@candyspet.cl"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted"
              >
                <Mail className="h-4 w-4" />
                contacto@candyspet.cl
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}