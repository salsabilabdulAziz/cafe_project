import { ShoppingBag, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onQuizClick: () => void;
  onShopClick: () => void;
}

export function Header({ cartCount, onCartClick, onQuizClick, onShopClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-espresso-100/70 bg-cream-50/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-espresso-800 text-cream-50 shadow-soft">
            <LeafIcon className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-xl font-extrabold text-espresso-900">
              أَثَر <span className="text-espresso-400">| Athar</span>
            </p>
            <p className="text-[11px] font-medium tracking-wide text-espresso-400">نكهة تترك أثراً لا يُنسى</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <button onClick={onShopClick} className="text-sm font-semibold text-espresso-700 transition-colors hover:text-espresso-900">
            المتجر
          </button>
          <button onClick={onQuizClick} className="flex items-center gap-1.5 text-sm font-semibold text-espresso-700 transition-colors hover:text-espresso-900">
            <Sparkles className="h-4 w-4 text-sky-400" />
            مستشار الذائقة
          </button>
          <a href="#story" className="text-sm font-semibold text-espresso-700 transition-colors hover:text-espresso-900">
            قصتنا
          </a>
        </nav>

        <button
          onClick={onCartClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-cream-100 text-espresso-800 transition-all hover:border-sky-400 hover:bg-sky-50"
          aria-label="السلة"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={2} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -left-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-400 px-1 text-[11px] font-bold text-cream-50 shadow-soft animate-scale-in">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

/* Minimalist coffee-bean / leaf hybrid mark */
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-7 5-13 14-13 0 9-6 14-13 14" />
      <path d="M9 15c2.5-2.5 5-4 9-4" />
    </svg>
  );
}
