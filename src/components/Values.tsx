import { ArrowLeft, Leaf, Thermometer, Timer } from 'lucide-react';

const VALUES = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: 'مصادر أخلاقية',
    desc: 'شراكة مباشرة مع مزارعين صغار، بأسعار عادلة وشفافية كاملة.',
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    title: 'تحميص طازج',
    desc: 'نحمّص خلال 48 ساعة من طلبك للحفاظ على أعلى نكهة ممكنة.',
  },
  {
    icon: <Timer className="h-6 w-6" />,
    title: 'طحن حسب الطلب',
    desc: 'نطحن حسب طريقة تحضيرك المفضلة: V60، إسبريسو، أو حبوب كاملة.',
  },
];

export function Values() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="grid gap-5 md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-3xl border border-espresso-100 bg-cream-100 p-7 transition-all hover:shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso-800 text-cream-50">
              {v.icon}
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-espresso-800">{v.title}</h3>
            <p className="mt-2 leading-relaxed text-espresso-600">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl bg-sky-400 text-cream-50">
        <div className="flex flex-col items-center gap-6 p-10 text-center md:flex-row md:justify-between md:text-right">
          <div className="max-w-xl">
            <p className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
              جرّب مستشار الذائقة واكتشف فنجانك المثالي
            </p>
            <p className="mt-3 text-sky-50">ثلاثة أسئلة بسيطة تقودك إلى المنتج الأنسب لذوقك وطريقة تحضيرك.</p>
          </div>
          <a href="#shop" className="btn-primary shrink-0 group">
            ابدأ التجربة
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
