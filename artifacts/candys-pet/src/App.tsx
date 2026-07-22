import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Products } from './components/Products';
import { SizeGuide } from './components/SizeGuide';
import { Testimonials } from './components/Testimonials';
import { Partnerships } from './components/Partnerships';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <Header />
        
        <main>
          <Hero />
          <Benefits />
          <Products />
          <SizeGuide />
          <Testimonials />
          <Partnerships />
          <Location />
        </main>
        
        <Footer />
        <FloatingWhatsApp />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
