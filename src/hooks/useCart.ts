import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItem, GrindOption, Product } from '../types';

const STORAGE_KEY = 'muhaymas-cart-v1';

export interface AddToCartInput {
  product: Product;
  grind: GrindOption;
  qty?: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback(({ product, grind, qty = 1 }: AddToCartInput) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id && i.grind === grind);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.grind === grind
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${grind}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          grind,
          qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  return { items, addItem, updateQty, removeItem, clear, count, subtotal };
}
