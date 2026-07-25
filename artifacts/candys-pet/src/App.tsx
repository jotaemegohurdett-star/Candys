import React from 'react';
import { Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Benefits } from './components/Benefits';
import { Products } from './components/Products';
import { SizeGuide } from './components/SizeGuide';
import { Testimonials } from './components/Testimonials';
import { Partnerships } from './components/Partnerships';
import { Location } from './components/Location';
import { PaymentMethods } from './components/PaymentMethods';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { PaymentResult } from './components/PaymentResult';
import { CartProvider } from './context/CartContext';
import { AdminPage } from './pages/AdminPage';

function StoreFront() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <Products />
          <Benefits />
          <SizeGuide />
          <Testimonials />
          <Partnerships />
          <Location />
          <PaymentMethods />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <PaymentResult />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{ style: { fontFamily: 'var(--font-sans)' } }}
        />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/admin" component={AdminPage} />
      <Route component={StoreFront} />
    </Switch>
  );
}

export default App;
