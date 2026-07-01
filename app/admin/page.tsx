import Header from '@/components/Header';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { products } from '@/lib/products';
import { formatMoney } from '@/lib/money';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  let orderCount: number | null = null;

  if (supabase) {
    const { count } = await supabase.from('orders').select('id', { count: 'exact', head: true });
    orderCount = count ?? 0;
  }

  return (
    <main className="app-shell">
      <Header cartCount={0} />
      <section className="admin-layout">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Supply control room</h1>
          </div>
          <span className={supabase ? 'status-pill ready' : 'status-pill'}>
            {supabase ? 'Supabase connected' : 'Supabase pending'}
          </span>
        </div>
        <div className="admin-stats">
          <div>
            <strong>{products.length}</strong>
            <span>Catalog items</span>
          </div>
          <div>
            <strong>{orderCount ?? '-'}</strong>
            <span>Database orders</span>
          </div>
          <div>
            <strong>10%</strong>
            <span>Markup</span>
          </div>
        </div>
        <div className="data-table">
          <div className="table-row table-head">
            <span>Item</span>
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
          </div>
          {products.map((product) => (
            <div className="table-row" key={product.id}>
              <span>{product.itemNumber}</span>
              <span>{product.name}</span>
              <span>{product.category}</span>
              <span>{formatMoney(product.price)}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
