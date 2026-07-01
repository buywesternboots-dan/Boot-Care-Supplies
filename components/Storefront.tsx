'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import ProductImage from '@/components/ProductImage';
import { formatMoney } from '@/lib/money';
import type { Product } from '@/lib/products';

type CartLine = {
  product: Product;
  quantity: number;
};

type StorefrontProps = {
  products: Product[];
};

export default function Storefront({ products }: StorefrontProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Zelle');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.category))).sort()], [products]);
  const brands = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.brand))).sort()], [products]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !needle ||
        [product.name, product.brand, product.itemNumber, product.category].join(' ').toLowerCase().includes(needle);
      const matchesCategory = category === 'All' || product.category === category;
      const matchesBrand = brand === 'All' || product.brand === brand;

      return matchesQuery && matchesCategory && matchesBrand;
    });
  }, [brand, category, products, query]);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.quantity * line.product.price, 0);

  function addToCart(product: Product) {
    setMessage(null);
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);

      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line
        );
      }

      return [...current, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((line) => (line.product.id === productId ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0)
    );
  }

  function removeLine(productId: string) {
    setCart((current) => current.filter((line) => line.product.id !== productId));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!cart.length) {
      setError('Add at least one item.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          paymentMethod,
          items: cart.map((line) => ({ productId: line.product.id, quantity: line.quantity }))
        })
      });
      const data = (await response.json()) as { error?: string; orderNumber?: string; stored?: boolean; total?: number; message?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Order could not be submitted.');
      }

      setMessage(`${data.orderNumber} submitted for ${formatMoney(data.total || cartTotal)}.${data.stored ? '' : ` ${data.message || ''}`}`);
      setCart([]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Order could not be submitted.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="app-shell">
      <Header cartCount={cartCount} onLogin={() => setLoginOpen(true)} />
      {loginOpen ? <LoginModal onClose={() => setLoginOpen(false)} /> : null}

      <section className="hero-band">
        <div className="hero-inner">
          <div>
            <h1>Cowboy boot care supply orders</h1>
            <p>Selected care, repair, and accessory products with request checkout and database-ready order handling.</p>
            <a className="primary-action" href="#products">
              Browse catalog
            </a>
          </div>
          <div className="hero-summary" aria-label="Catalog summary">
            <strong>{products.length}</strong>
            <span>selected supply items</span>
          </div>
        </div>
      </section>

      <section className="catalog-layout" id="products">
        <div className="catalog-main">
          <div className="toolbar">
            <input
              value={query}
              type="search"
              placeholder="Search item, brand, or number"
              onChange={(event) => setQuery(event.target.value)}
            />
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All categories' : option}
                </option>
              ))}
            </select>
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              {brands.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All brands' : option}
                </option>
              ))}
            </select>
          </div>

          <p className="small-copy">{filtered.length} products shown</p>
          <div className="product-grid">
            {filtered.map((product) => (
              <article className="product-card" key={product.id}>
                <Link className="product-thumb" href={`/products/${product.id}`}>
                  <span className="badge">{product.category}</span>
                  <ProductImage label={product.name} />
                </Link>
                <div className="product-body">
                  <div className="meta-row">
                    <span>{product.brand}</span>
                    <span>{product.itemNumber}</span>
                    <span>{product.unit}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <div className="price-row">
                    <div>
                      <div className="price">{formatMoney(product.price)}</div>
                      <div className="small-copy">Wholesale + 10%</div>
                    </div>
                    <span className="small-copy">Stock: {product.inventory ?? 'Review'}</span>
                  </div>
                  <div className="card-actions">
                    <Link className="ghost-action" href={`/products/${product.id}`}>
                      Details
                    </Link>
                    <button className="primary-action" type="button" onClick={() => addToCart(product)}>
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="cart-panel" id="cart">
          <h2>Supply request</h2>
          <div className="cart-lines">
            {cart.length ? (
              cart.map((line) => (
                <div className="cart-line" key={line.product.id}>
                  <strong>{line.product.name}</strong>
                  <span className="small-copy">{formatMoney(line.product.price)} each</span>
                  <div className="qty-control">
                    <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(line.product.id, -1)}>
                      <Minus size={14} />
                    </button>
                    <span>{line.quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(line.product.id, 1)}>
                      <Plus size={14} />
                    </button>
                    <button type="button" aria-label="Remove item" onClick={() => removeLine(line.product.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No items added yet.</div>
            )}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <span>{formatMoney(cartTotal)}</span>
          </div>

          <form className="checkout-form" onSubmit={submitOrder}>
            <label className="field-label">
              Name
              <input value={customerName} required onChange={(event) => setCustomerName(event.target.value)} />
            </label>
            <label className="field-label">
              Email
              <input value={customerEmail} required type="email" onChange={(event) => setCustomerEmail(event.target.value)} />
            </label>
            <label className="field-label">
              Payment method
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option>Zelle</option>
                <option>PayPal</option>
                <option>Cash App</option>
                <option>Other</option>
              </select>
            </label>
            <button className="primary-action" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Request order'}
            </button>
          </form>
          {message ? <div className="form-message">{message}</div> : null}
          {error ? <div className="form-message error">{error}</div> : null}
        </aside>
      </section>
    </main>
  );
}
