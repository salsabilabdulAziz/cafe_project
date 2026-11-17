import { useMemo, useState } from 'react';
import { ArrowLeft, Check, RotateCcw, Sparkles, X } from 'lucide-react';
import type { FlavorNote, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface CoffeeQuizProps {
  open: boolean;
  onClose: () => void;
  onPick: (product: Product) => void;
}

type FlavorChoice = 'fruity' | 'chocolate' | 'nuts';
type BrewChoice = 'v60' | 'espresso' | 'matcha';
type MoodChoice = 'bright' | 'cozy' | 'ritual';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: { id: string; label: string; desc: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'flavor',
    title: 'ما النكهات التي تفضّلها؟',
    subtitle: 'اختر المذاق الأقرب إلى ذوقك',
    options: [
      { id: 'fruity', label: 'فاكهية زاهية', desc: 'حمضيات، توت، زهور' },
      { id: 'chocolate', label: 'شوكولاتة دافئة', desc: 'كاكاو، كراميل، حليب' },
      { id: 'nuts', label: 'مكسرات محمصة', desc: 'لوز، بندق، زبدة' },
    ],
  },
  {
    id: 'brew',
    title: 'كيف تحب أن تحضّر فنجانك؟',
    subtitle: 'طريقة التحضير تحدد الطحن المثالي',
    options: [
      { id: 'v60', label: 'V60 مقطرة', desc: 'نكهة نقية، حموضة واضحة' },
      { id: 'espresso', label: 'إسبريسو مركز', desc: 'كثافة وقوام حريري' },
      { id: 'matcha', label: 'ماتشا', desc: 'أومامي أخضر كريمي' },
    ],
  },
  {
    id: 'mood',
    title: 'ما مزاج فنجانك اليوم؟',
    subtitle: 'سنساعدك في إيجاد الأنسب',
    options: [
      { id: 'bright', label: 'منعش وحياتي', desc: 'بداية صباح مشرقة' },
      { id: 'cozy', label: 'دافئ ومتوازن', desc: 'لحظة هدوء' },
      { id: 'ritual', label: 'طقوس وخبرة', desc: 'تجربة تأملية' },
    ],
  },
];

export function CoffeeQuiz({ open, onClose, onPick }: CoffeeQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const recommendation = useMemo<Product | null>(() => {
    if (step < QUESTIONS.length) return null;
    const flavor = answers.flavor as FlavorChoice | undefined;
    const brew = answers.brew as BrewChoice | undefined;
    const mood = answers.mood as MoodChoice | undefined;

    if (brew === 'matcha') {
      if (mood === 'ritual') return PRODUCTS.find((p) => p.id === 'matcha-ritual') ?? null;
      return PRODUCTS.find((p) => p.id === 'ceremonial-matcha') ?? null;
    }

    const candidates = PRODUCTS.filter(
      (p) => p.category === 'coffee' || p.category === 'bundles'
    );

    const score = (p: Product): number => {
      let s = 0;
      if (flavor && p.flavorNotes.includes(flavor)) s += 3;
      if (mood === 'bright' && p.flavorNotes.includes('fruity')) s += 2;
      if (mood === 'cozy' && p.flavorNotes.includes('chocolate')) s += 2;
      if (mood === 'cozy' && p.flavorNotes.includes('nuts')) s += 1;
      if (mood === 'ritual' && p.id === 'tasting-bundle') s += 3;
      if (brew === 'espresso' && p.roast?.includes('متوسطة')) s += 1;
      if (brew === 'v60' && p.roast?.includes('فاتحة')) s += 1;
      if (flavor === 'fruity' && p.flavorNotes.length === 1) s += 1;
      return s;
    };

    return [...candidates].sort((a, b) => score(b) - score(a))[0] ?? null;
  }, [answers, step]);

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const close = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const choose = (qid: string, oid: string) => {
    setAnswers((a) => ({ ...a, [qid]: oid }));
    setStep((s) => s + 1);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-cream-50 shadow-lift animate-scale-in">
        <button
          onClick={close}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-espresso-600 transition-colors hover:bg-cream-200"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>

        {step < QUESTIONS.length ? (
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-sky-500">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">مستشار الذائقة</span>
            </div>

            <div className="mt-6 flex gap-1.5">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i <= step ? 'bg-espresso-800' : 'bg-espresso-100'
                  }`}
                />
              ))}
            </div>

            <h2 className="mt-8 font-display text-3xl font-black text-espresso-900">{QUESTIONS[step].title}</h2>
            <p className="mt-2 text-espresso-500">{QUESTIONS[step].subtitle}</p>

            <div className="mt-7 space-y-3">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => choose(QUESTIONS[step].id, opt.id)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-espresso-200 bg-cream-100 px-5 py-4 text-right transition-all duration-200 hover:border-espresso-400 hover:bg-cream-200 hover:shadow-soft"
                >
                  <div>
                    <p className="font-display text-lg font-bold text-espresso-900">{opt.label}</p>
                    <p className="mt-0.5 text-sm text-espresso-500">{opt.desc}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso-200 text-espresso-400 transition-all group-hover:border-espresso-700 group-hover:bg-espresso-800 group-hover:text-cream-50">
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 text-sm font-semibold text-espresso-400 transition-colors hover:text-espresso-700"
              >
                السؤال السابق
              </button>
            )}
          </div>
        ) : (
          <RecommendationView product={recommendation} onReset={reset} onPick={(p) => { onPick(p); close(); }} />
        )}
      </div>
    </div>
  );
}

function RecommendationView({
  product,
  onReset,
  onPick,
}: {
  product: Product | null;
  onReset: () => void;
  onPick: (p: Product) => void;
}) {
  if (!product) {
    return (
      <div className="bg-sky-50 p-12 text-center">
        <p className="font-display text-2xl font-bold text-espresso-800">لم نعثر على تطابق مثالي</p>
        <button onClick={onReset} className="btn-primary mt-6">إعادة التجربة</button>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-[1fr_1.1fr]">
      <div className="relative h-64 md:h-full">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/50 to-transparent md:bg-gradient-to-l" />
      </div>
      <div className="bg-sky-50 p-8 md:p-10">
        <div className="flex items-center gap-2 text-sky-500">
          <Check className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">اختيارنا لك</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-espresso-800">{product.name}</h2>
        <p className="mt-1 text-sm font-medium text-espresso-400">{product.origin}</p>
        <p className="mt-5 leading-relaxed text-espresso-600">{product.description}</p>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-cream-50 px-5 py-4 shadow-soft">
          <div>
            <p className="text-xs font-medium text-espresso-400">السعر</p>
            <p className="font-display text-2xl font-extrabold text-espresso-800">
              {new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(product.price)}
            </p>
          </div>
          <button onClick={() => onPick(product)} className="btn-primary group">
            أضف إلى السلة
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>

        <button
          onClick={onReset}
          className="mt-5 flex items-center gap-2 text-sm font-semibold text-espresso-400 transition-colors hover:text-espresso-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          إعادة التجربة
        </button>
      </div>
    </div>
  );
}
