import React from 'react';
import { Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Benefits } from './components/Benefits';
import { Products } from './components/Products';
import { VideoSection } from './components/VideoSection';
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
import { PRODUCT_SEO, ProductLandingPage } from './pages/ProductLandingPage';

function StoreFront() {
  React.useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <VideoSection />
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
      <Route path={PRODUCT_SEO.bomber.path}>
        <ProductLandingPage product={PRODUCT_SEO.bomber} />
      </Route>
      <Route path={PRODUCT_SEO.unisex.path}>
        <ProductLandingPage product={PRODUCT_SEO.unisex} />
      </Route>
      <Route component={StoreFront} />
    </Switch>
  );
}

export default App;
