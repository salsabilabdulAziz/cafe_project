import { Instagram, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="story" className="mt-20 border-t border-espresso-100 bg-espresso-800 text-cream-200">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream-50 text-espresso-800">
                <LeafIcon className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <p className="font-display text-xl font-extrabold text-cream-50">
                  أَثَر <span className="text-cream-300">| Athar</span>
                </p>
                <p className="text-[11px] font-medium tracking-wide text-cream-300">نكهة تترك أثراً لا يُنسى</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-300">
              نختار أجود المحاصيل من مزارع صغيرة حول العالم، ونحمّصها بعناية لتصل إلى فنجانك طازجة. مهمتنا: تجربة ذوقية استثنائية في كل رشفة.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-espresso-700 text-cream-100 transition-colors hover:bg-sky-400" aria-label="إنستغرام">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-espresso-700 text-cream-100 transition-colors hover:bg-sky-400" aria-label="البريد">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-cream-300">روابط</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#" className="text-cream-200 transition-colors hover:text-cream-50">المتجر</a></li>
              <li><a href="#" className="text-cream-200 transition-colors hover:text-cream-50">محاصيل القهوة</a></li>
              <li><a href="#" className="text-cream-200 transition-colors hover:text-cream-50">الماتشا</a></li>
              <li><a href="#" className="text-cream-200 transition-colors hover:text-cream-50">أدوات التحضير</a></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-cream-300">تواصل معنا</p>
            <ul className="mt-5 space-y-3 text-sm text-cream-200">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-300" />
                الرياض، حي العليا
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-300" />
                hello@athar.co
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-espresso-700 pt-6 text-xs text-cream-400 md:flex-row">
          <p>© 2026 أَثَر | Athar. جميع الحقوق محفوظة.</p>
          <p>نكهة تترك أثراً لا يُنسى.</p>
        </div>
      </div>
    </footer>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-7 5-13 14-13 0 9-6 14-13 14" />
      <path d="M9 15c2.5-2.5 5-4 9-4" />
    </svg>
  );
}
