import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ProductImage from '@/components/ProductImage';
import { formatMoney } from '@/lib/money';
import { products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="app-shell">
      <Header cartCount={0} />
      <section className="detail-layout">
        <div className="media-panel">
          <ProductImage label={product.name} size="large" />
        </div>
        <div className="detail-panel">
          <Link className="text-button" href="/">
            Back to catalog
          </Link>
          <div className="meta-row with-space">
            <span>{product.category}</span>
            <span>{product.brand}</span>
            <span>Item {product.itemNumber}</span>
          </div>
          <h1>{product.name}</h1>
          <p className="muted-copy">{product.description}</p>
          <div className="stat-grid">
            <div>
              <strong>{formatMoney(product.price)}</strong>
              <span>Order price</span>
            </div>
            <div>
              <strong>{formatMoney(product.wholesale)}</strong>
              <span>Wholesale</span>
            </div>
            <div>
              <strong>{product.unit}</strong>
              <span>Unit</span>
            </div>
            <div>
              <strong>{product.inventory ?? 'Review'}</strong>
              <span>Inventory</span>
            </div>
          </div>
          <Link className="primary-action" href="/#products">
            Add from catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
