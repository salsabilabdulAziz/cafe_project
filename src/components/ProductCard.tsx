import { ArrowLeft, Plus } from 'lucide-react';
import type { Product } from '../types';
import { CATEGORIES, FLAVOR_NOTES, formatSAR } from '../types';

interface ProductCardProps {
  product: Product;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export function ProductCard({ product, onOpen, onQuickAdd }: ProductCardProps) {
  const cat = CATEGORIES.find((c) => c.id === product.category);

  return (
    <article className="card group flex flex-col overflow-hidden">
      <div className="relative cursor-pointer overflow-hidden" onClick={() => onOpen(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.tags && product.tags.length > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-sky-400 px-3 py-1 text-[11px] font-bold text-cream-50 shadow-soft">
            {product.tags[0]}
          </span>
        )}
        {product.flavorNotes.length > 0 && (
          <div className="absolute bottom-3 right-3 flex flex-wrap gap-1.5">
            {product.flavorNotes.map((fn) => {
              const note = FLAVOR_NOTES.find((n) => n.id === fn);
              return (
                <span
                  key={fn}
                  className="rounded-full bg-espresso-900/80 px-2.5 py-1 text-[11px] font-medium text-cream-100 backdrop-blur"
                >
                  {note?.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-espresso-400">{cat?.short}</p>
        <h3
          className="mt-1.5 cursor-pointer font-display text-xl font-bold text-espresso-800 transition-colors hover:text-sky-600"
          onClick={() => onOpen(product)}
        >
          {product.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-espresso-400">{product.origin}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-espresso-600">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <p className="font-display text-2xl font-extrabold text-espresso-800">{formatSAR(product.price)}</p>
            <p className="text-[11px] font-medium text-espresso-400">{product.weight}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickAdd(product)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 text-espresso-700 transition-all hover:border-sky-400 hover:bg-sky-50"
              aria-label="إضافة سريعة"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onOpen(product)}
              className="flex h-10 items-center gap-1.5 rounded-full bg-sage-500 px-4 text-xs font-bold text-cream-50 transition-all hover:bg-sage-600"
            >
              التفاصيل
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
