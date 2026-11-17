export type CategoryId = 'coffee' | 'matcha' | 'tools' | 'bundles';

export type FlavorNote = 'fruity' | 'chocolate' | 'nuts';

export type GrindOption = 'whole' | 'v60' | 'espresso';

export interface BrewGuide {
  ratio: string;
  temperature: string;
  time: string;
  steps: string[];
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  category: CategoryId;
  price: number;
  weight: string;
  flavorNotes: FlavorNote[];
  description: string;
  story: string;
  image: string;
  roast?: string;
  brew?: BrewGuide;
  tags?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  grind: GrindOption;
  qty: number;
}

export const CATEGORIES: { id: CategoryId; label: string; short: string }[] = [
  { id: 'coffee', label: 'محاصيل القهوة', short: 'قهوة' },
  { id: 'matcha', label: 'الماتشا', short: 'ماتشا' },
  { id: 'tools', label: 'أدوات التحضير', short: 'أدوات' },
  { id: 'bundles', label: 'باقات التذوق', short: 'باقات' },
];

export const FLAVOR_NOTES: { id: FlavorNote; label: string }[] = [
  { id: 'fruity', label: 'فاكهية' },
  { id: 'chocolate', label: 'شوكولاتة' },
  { id: 'nuts', label: 'مكسرات' },
];

export const GRIND_OPTIONS: { id: GrindOption; label: string; desc: string }[] = [
  { id: 'whole', label: 'حبوب كاملة', desc: 'تطحن يدويًا قبل التحضير للحصول على أقصى نكهة' },
  { id: 'v60', label: 'طحنة V60', desc: 'متوسطة النعومة، مثالية للقهوة المقطرة' },
  { id: 'espresso', label: 'طحنة إسبريسو', desc: 'نعومة عالية لاستخلاص قهوة مركزة' },
];

export const formatSAR = (n: number): string =>
  new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 0,
  }).format(n);
