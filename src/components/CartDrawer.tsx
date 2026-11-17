import { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Loader2, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import type { CartItem, GrindOption } from '../types';
import { GRIND_OPTIONS, formatSAR } from '../types';
import { supabase } from '../lib/supabase';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const SHIPPING_FEE = 25;
const FREE_SHIPPING_THRESHOLD = 200;

type Stage = 'cart' | 'checkout' | 'success';

export function CartDrawer({
  open,
  items,
  subtotal,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const [stage, setStage] = useState<Stage>('cart');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: '',
    payment_method: 'cod' as 'cod' | 'card',
    notes: '',
  });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const grindLabel = (g: GrindOption) => GRIND_OPTIONS.find((o) => o.id === g)?.label ?? g;

  const close = () => {
    onClose();
    setTimeout(() => {
      setStage('cart');
      setError(null);
    }, 300);
  };

  const submitOrder = async () => {
    setError(null);
    if (items.length === 0) {
      setError('سلتك فارغة.');
      return;
    }
    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from('orders').insert({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        shipping_address: form.shipping_address,
        city: form.city,
        payment_method: form.payment_method,
        items: items.map((i) => ({
          id: i.productId,
          name: i.name,
          price: i.price,
          qty: i.qty,
          grind: i.grind,
        })),
        subtotal,
        shipping_fee: shipping,
        total,
        notes: form.notes || null,
        status: 'new',
      });
      if (insertError) throw insertError;
      onClear();
      setStage('success');
    } catch (e) {
      setError('تعذّر إتمام الطلب. تحقق من اتصالك وحاول مرة أخرى.');
      void e;
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const formValid =
    form.customer_name.trim() &&
    form.customer_email.trim() &&
    form.customer_phone.trim() &&
    form.shipping_address.trim() &&
    form.city.trim();

  return (
    <div className="fixed inset-0 z-50 flex justify-start animate-fade-in">
      <div className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm" onClick={close} />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-lift animate-slide-in md:max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-espresso-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-espresso-700" />
            <h2 className="font-display text-lg font-bold text-espresso-900">
              {stage === 'cart' && 'سلة التسوق'}
              {stage === 'checkout' && 'إتمام الطلب'}
              {stage === 'success' && 'تم الطلب'}
            </h2>
          </div>
          <button
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-espresso-600 transition-colors hover:bg-cream-200"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {stage === 'success' ? (
          <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-sage-600 animate-scale-in">
              <Check className="h-10 w-10" strokeWidth={2.5} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-black text-espresso-900">شكرًا لك على طلبك</h3>
            <p className="mt-3 max-w-xs text-espresso-600">
              استلمنا طلبك بنجاح وسنبدأ بتجهيزه فورًا. ستصلك تفاصيل الشحن على بريدك الإلكتروني.
            </p>
            <button onClick={close} className="btn-primary mt-8">
              متابعة التسوق
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 text-espresso-300">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <p className="mt-6 font-display text-xl font-bold text-espresso-700">سلتك فارغة</p>
            <p className="mt-2 text-sm text-espresso-400">أضف بعض المحاصيل أو أدوات التحضير لتبدأ.</p>
            <button onClick={close} className="btn-ghost mt-6">
              تصفّح المتجر
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            {stage === 'cart' && (
              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-2xl border border-espresso-100 bg-cream-100 p-3">
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-base font-bold text-espresso-900">{item.name}</p>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-espresso-300 transition-colors hover:text-terracotta-500"
                          aria-label="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-espresso-400">{grindLabel(item.grind)}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-espresso-200 bg-cream-50">
                          <button
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                            className="flex h-8 w-8 items-center justify-center text-espresso-700 hover:text-espresso-900"
                            aria-label="إنقاص"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-espresso-900">{item.qty}</span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                            className="flex h-8 w-8 items-center justify-center text-espresso-700 hover:text-espresso-900"
                            aria-label="زيادة"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-display text-base font-black text-espresso-900">
                          {formatSAR(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Checkout form */}
            {stage === 'checkout' && (
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                <Field label="الاسم الكامل" required>
                  <input
                    type="text"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    placeholder="مثال: أحمد العتيبي"
                    className="w-full rounded-xl border border-espresso-200 bg-cream-100 px-4 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-espresso-500 focus:outline-none"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="البريد الإلكتروني" required>
                    <input
                      type="email"
                      value={form.customer_email}
                      onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-espresso-200 bg-cream-100 px-4 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-espresso-500 focus:outline-none"
                    />
                  </Field>
                  <Field label="رقم الجوال" required>
                    <input
                      type="tel"
                      value={form.customer_phone}
                      onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                      placeholder="05xxxxxxxx"
                      className="w-full rounded-xl border border-espresso-200 bg-cream-100 px-4 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-espresso-500 focus:outline-none"
                    />
                  </Field>
                </div>
                <Field label="عنوان الشحن" required>
                  <input
                    type="text"
                    value={form.shipping_address}
                    onChange={(e) => setForm({ ...form, shipping_address: e.target.value })}
                    placeholder="الحي، الشارع، رقم المبنى"
                    className="w-full rounded-xl border border-espresso-200 bg-cream-100 px-4 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-espresso-500 focus:outline-none"
                  />
                </Field>
                <Field label="المدينة" required>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-xl border border-espresso-200 bg-cream-100 px-4 py-2.5 text-sm text-espresso-900 focus:border-espresso-500 focus:outline-none"
                  >
                    <option value="">اختر المدينة</option>
                    {['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'أبها', 'تبوك', 'الطائف'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="طريقة الدفع">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, payment_method: 'cod' })}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-bold transition-all ${
                        form.payment_method === 'cod'
                          ? 'border-espresso-800 bg-espresso-800 text-cream-50'
                          : 'border-espresso-200 bg-cream-100 text-espresso-700'
                      }`}
                    >
                      <Truck className="h-4 w-4" />
                      الدفع عند الاستلام
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, payment_method: 'card' })}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-bold transition-all ${
                        form.payment_method === 'card'
                          ? 'border-espresso-800 bg-espresso-800 text-cream-50'
                          : 'border-espresso-200 bg-cream-100 text-espresso-700'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      بطاقة مدى/فيزا
                    </button>
                  </div>
                </Field>
                <Field label="ملاحظات إضافية (اختياري)">
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    placeholder="أي تفاصيل إضافية للطلب أو التوصيل"
                    className="w-full rounded-xl border border-espresso-200 bg-cream-100 px-4 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-espresso-500 focus:outline-none"
                  />
                </Field>
                {error && (
                  <p className="rounded-xl bg-terracotta-500/10 px-4 py-3 text-sm font-medium text-terracotta-600">
                    {error}
                  </p>
                )}
              </div>
            )}

            {/* Footer summary */}
            <div className="border-t border-espresso-100 px-5 py-4">
              {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                <p className="mb-3 rounded-xl bg-sage-50 px-3 py-2 text-center text-xs font-medium text-sage-700">
                  أضف {formatSAR(FREE_SHIPPING_THRESHOLD - subtotal)} للحصول على شحن مجاني
                </p>
              )}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-espresso-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-semibold text-espresso-800">{formatSAR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-espresso-600">
                  <span>الشحن</span>
                  <span className="font-semibold text-espresso-800">
                    {shipping === 0 ? 'مجاني' : formatSAR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-espresso-100 pt-2">
                  <span className="font-display text-base font-bold text-espresso-900">الإجمالي</span>
                  <span className="font-display text-xl font-black text-espresso-900">{formatSAR(total)}</span>
                </div>
              </div>

              {stage === 'cart' ? (
                <button onClick={() => setStage('checkout')} className="btn-primary mt-4 w-full">
                  متابعة للدفع
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setStage('cart')} className="btn-ghost">
                    رجوع
                  </button>
                  <button
                    onClick={submitOrder}
                    disabled={submitting || !formValid}
                    className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        جاري الإرسال
                      </>
                    ) : (
                      <>
                        تأكيد الطلب — {formatSAR(total)}
                        <ArrowLeft className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-espresso-700">
        {label}
        {required && <span className="text-terracotta-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
