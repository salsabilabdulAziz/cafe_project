import { useMemo, useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import type { CategoryId, FlavorNote, Product } from '../types';
import { CATEGORIES, FLAVOR_NOTES } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  onOpenProduct: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export function Catalog({ onOpenProduct, onQuickAdd }: CatalogProps) {
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [flavors, setFlavors] = useState<FlavorNote[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFlavor = (f: FlavorNote) =>
    setFlavors((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (flavors.length > 0 && !flavors.every((f) => p.flavorNotes.includes(f))) return false;
      return true;
    });
  }, [category, flavors]);

  const hasFilters = category !== 'all' || flavors.length > 0;

  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-col gap-3">
        <span className="section-label">المتجر</span>
        <h2 className="font-display text-4xl font-extrabold text-espresso-800 md:text-5xl">اكتشف مجموعتنا</h2>
        <p className="max-w-xl text-espresso-600">محاصيل مختارة بعناية، أدوات حرفية، وباقات تذوق — كل ما تحتاجه لتجربة قهوة مميزة في منزلك.</p>
      </div>

      {/* Category pills */}
      <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory('all')}
          className={`chip whitespace-nowrap ${category === 'all' ? 'chip-active' : 'chip-inactive'}`}
        >
          الكل
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`chip whitespace-nowrap ${category === c.id ? 'chip-active' : 'chip-inactive'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Flavor filters */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-sm font-bold text-espresso-700">
          <SlidersHorizontal className="h-4 w-4 text-espresso-400" />
          نكهات
        </span>
        {FLAVOR_NOTES.map((f) => (
          <button
            key={f.id}
            onClick={() => toggleFlavor(f.id)}
            className={`chip ${flavors.includes(f.id) ? 'chip-active' : 'chip-inactive'}`}
          >
            {f.label}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={() => {
              setCategory('all');
              setFlavors([]);
            }}
            className="flex items-center gap-1 text-sm font-semibold text-espresso-400 transition-colors hover:text-espresso-700"
          >
            <X className="h-3.5 w-3.5" />
            مسح الفلاتر
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onQuickAdd={onQuickAdd} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-espresso-200 py-16 text-center">
          <Filter className="h-10 w-10 text-espresso-300" />
          <p className="mt-4 font-display text-xl font-bold text-espresso-700">لا توجد منتجات مطابقة</p>
          <p className="mt-1 text-sm text-espresso-400">جرّب تعديل الفلاتر للعثور على ما يناسبك</p>
        </div>
      )}
    </section>
  );
}
