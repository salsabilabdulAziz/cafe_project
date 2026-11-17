import { useState } from 'react';
import { ArrowLeft, Check, Minus, Plus, Thermometer, Timer, X } from 'lucide-react';
import type { GrindOption, Product } from '../types';
import { FLAVOR_NOTES, GRIND_OPTIONS, formatSAR } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, grind: GrindOption, qty: number) => void;
}

export function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [grind, setGrind] = useState<GrindOption>('whole');
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const close = () => {
    setGrind('whole');
    setQty(1);
    onClose();
  };

  const hasBrew = Boolean(product.brew);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 animate-fade-in md:items-center md:p-4">
      <div className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm" onClick={close} />
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-cream-50 shadow-lift animate-slide-in md:rounded-3xl md:animate-scale-in">
        <button
          onClick={close}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-espresso-700 shadow-soft backdrop-blur transition-colors hover:bg-cream-100"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-72 md:h-full">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 md:p-8">
            {product.tags && product.tags.length > 0 && (
              <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold text-sky-700">
                {product.tags[0]}
              </span>
            )}
            <h2 className="mt-3 font-display text-3xl font-extrabold text-espresso-800">{product.name}</h2>
            <p className="mt-1 text-sm font-medium text-espresso-400">{product.origin}</p>

            {product.flavorNotes.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.flavorNotes.map((fn) => {
                  const note = FLAVOR_NOTES.find((n) => n.id === fn);
                  return (
                    <span key={fn} className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-espresso-700">
                      {note?.label}
                    </span>
                  );
                })}
                {product.roast && (
                  <span className="rounded-full bg-espresso-800 px-3 py-1 text-xs font-semibold text-cream-50">
                    {product.roast}
                  </span>
                )}
              </div>
            )}

            <p className="mt-5 leading-relaxed text-espresso-600">{product.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-espresso-400">{product.story}</p>

            {/* Grind options */}
            <div className="mt-7">
              <p className="font-display text-sm font-bold text-espresso-900">خيارات الطحن</p>
              <div className="mt-3 grid gap-2">
                {GRIND_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGrind(opt.id)}
                    className={`flex items-start gap-3 rounded-2xl border p-3.5 text-right transition-all ${
                      grind === opt.id
                        ? 'border-sky-400 bg-sky-400 text-cream-50'
                        : 'border-espresso-200 bg-cream-100 text-espresso-700 hover:border-sky-300'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        grind === opt.id ? 'border-cream-50 bg-cream-50 text-sky-700' : 'border-espresso-300'
                      }`}
                    >
                      {grind === opt.id && <Check className="h-3 w-3" strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{opt.label}</p>
                      <p className={`mt-0.5 text-xs ${grind === opt.id ? 'text-cream-200' : 'text-espresso-400'}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Brew guide */}
            {hasBrew && (
              <div className="mt-7 rounded-2xl border border-sage-200 bg-sage-50 p-5">
                <p className="font-display text-sm font-bold text-sage-800">وصفة التحضير المقترحة</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <BrewStat icon={<ArrowLeft className="h-4 w-4" />} label="النسبة" value={product.brew!.ratio} />
                  <BrewStat icon={<Thermometer className="h-4 w-4" />} label="الحرارة" value={product.brew!.temperature} />
                  <BrewStat icon={<Timer className="h-4 w-4" />} label="الوقت" value={product.brew!.time} />
                </div>
                <ol className="mt-4 space-y-2">
                  {product.brew!.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-sage-800">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-200 text-xs font-bold text-sage-800">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-espresso-200 bg-cream-100">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-espresso-700 transition-colors hover:text-espresso-900"
                  aria-label="إنقاص"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-display text-lg font-bold text-espresso-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center text-espresso-700 transition-colors hover:text-espresso-900"
                  aria-label="زيادة"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  onAdd(product, grind, qty);
                  close();
                }}
                className="btn-primary flex-1 group"
              >
                أضف إلى السلة — {formatSAR(product.price * qty)}
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrewStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream-50 py-2.5">
      <div className="flex items-center justify-center text-sage-500">{icon}</div>
      <p className="mt-1 text-[11px] font-medium text-sage-600">{label}</p>
      <p className="text-xs font-bold text-sage-800">{value}</p>
    </div>
  );
}
