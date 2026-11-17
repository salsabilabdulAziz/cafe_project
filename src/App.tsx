import { useCallback, useRef, useState } from 'react';
import type { GrindOption, Product } from './types';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Values } from './components/Values';
import { Catalog } from './components/Catalog';
import { Footer } from './components/Footer';
import { CoffeeQuiz } from './components/CoffeeQuiz';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const cart = useCart();
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const shopRef = useRef<HTMLDivElement | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const scrollToShop = useCallback(() => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleQuickAdd = useCallback(
    (p: Product) => {
      cart.addItem({ product: p, grind: 'whole', qty: 1 });
      showToast(`تمت إضافة ${p.name} إلى السلة`);
    },
    [cart, showToast]
  );

  const handleAddFromModal = useCallback(
    (p: Product, grind: GrindOption, qty: number) => {
      cart.addItem({ product: p, grind, qty });
      showToast(`تمت إضافة ${p.name} إلى السلة`);
    },
    [cart, showToast]
  );

  const handleQuizPick = useCallback(
    (p: Product) => {
      setActiveProduct(p);
    },
    []
  );

  return (
    <div className="min-h-screen">
      <Header
        cartCount={cart.count}
        onCartClick={() => setCartOpen(true)}
        onQuizClick={() => setQuizOpen(true)}
        onShopClick={scrollToShop}
      />

      <main>
        <Hero onShopClick={scrollToShop} onQuizClick={() => setQuizOpen(true)} />
        <Values />
        <div ref={shopRef}>
          <Catalog onOpenProduct={setActiveProduct} onQuickAdd={handleQuickAdd} />
        </div>
      </main>

      <Footer />

      <CoffeeQuiz open={quizOpen} onClose={() => setQuizOpen(false)} onPick={handleQuizPick} />
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAdd={handleAddFromModal}
      />
      <CartDrawer
        open={cartOpen}
        items={cart.items}
        subtotal={cart.subtotal}
        onClose={() => setCartOpen(false)}
        onUpdateQty={cart.updateQty}
        onRemove={cart.removeItem}
        onClear={cart.clear}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 animate-fade-up rounded-full bg-espresso-900 px-5 py-3 text-sm font-semibold text-cream-50 shadow-lift">
          {toast}
        </div>
      )}
    </div>
  );
}
