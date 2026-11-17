/*
# Create orders table (single-tenant, no auth)

1. New Tables
- `orders`
- `id` (uuid, primary key)
- `customer_name` (text, customer full name)
- `customer_email` (text, contact email)
- `customer_phone` (text, contact phone)
- `shipping_address` (text, shipping address line)
- `city` (text, city in Saudi Arabia)
- `payment_method` (text, e.g. "cod" / "card")
- `items` (jsonb, array of cart items: {id, name, price, qty, grind})
- `subtotal` (numeric, total price before shipping in SAR)
- `shipping_fee` (numeric, shipping cost in SAR)
- `total` (numeric, grand total in SAR)
- `notes` (text, optional customer notes)
- `status` (text, order status, default 'new')
- `created_at` (timestamp)
2. Security
- Enable RLS on `orders`.
- Grant CRUD to `anon` + `authenticated` so the Data API can reach the table (no-auth app).
- Allow anon + authenticated CRUD because orders are created by anonymous visitors.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  city text NOT NULL,
  payment_method text NOT NULL DEFAULT 'cod',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  shipping_fee numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON orders TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
TO anon, authenticated USING (true);
