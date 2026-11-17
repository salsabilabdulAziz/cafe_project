import { ArrowLeft, Sparkles } from 'lucide-react';
import { HERO_IMAGE, HERO_IMAGE_2, ICED_MATCHA_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onQuizClick: () => void;
}

export function Hero({ onShopClick, onQuizClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Text */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-espresso-700">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              أَثَر · محاصيل مختارة بعناية
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.15] text-espresso-800 md:text-7xl">
              نكهة تترك
              <br />
              <span className="text-sky-400">أثراً لا يُنسى</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso-600">
              قهوة مختصة من أرقى المزارع حول العالم، وماتشا طقوسية من كيوتو — محمّصة بعناية، ومطحونة حسب طريقة تحضيرك المفضلة.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button onClick={onShopClick} className="btn-primary group">
                تسوّق الآن
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <button onClick={onQuizClick} className="btn-ghost group">
                <Sparkles className="h-4 w-4 text-sky-400" />
                مستشار الذائقة
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-espresso-100 pt-8">
              <Stat number="+12" label="محصول مختص" />
              <Stat number="3" label="درجات حمصة" />
              <Stat number="48h" label="تحميص طازج" />
            </div>
          </div>

          {/* Images */}
          <div className="relative grid grid-cols-2 gap-4 md:gap-5">
            <div className="space-y-4 md:space-y-5 pt-10">
              <img
                src={HERO_IMAGE}
                alt="تحضير القهوة المقطرة"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift"
                loading="eager"
              />
              <img
                src={ICED_MATCHA_IMAGE}
                alt="ماتشا مثلج"
                className="aspect-square w-full rounded-3xl object-cover shadow-soft"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 md:space-y-5">
              <img
                src={HERO_IMAGE_2}
                alt="تحضير V60"
                className="aspect-square w-full rounded-3xl object-cover shadow-soft"
                loading="lazy"
              />
              <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-3xl bg-sky-400 p-6 text-center text-cream-50 shadow-lift">
                <p className="font-display text-3xl font-extrabold leading-tight">من المزرعة</p>
                <p className="font-display text-3xl font-extrabold leading-tight text-sky-100">إلى فنجانك</p>
                <p className="mt-4 text-sm leading-relaxed text-sky-50">
                  سلسلة مصادر شفافة، مع تحميص طازج خلال 48 ساعة من الطلب.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-extrabold text-espresso-900">{number}</p>
      <p className="mt-1 text-xs font-medium text-espresso-400">{label}</p>
    </div>
  );
}
