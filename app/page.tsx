import Storefront from '@/components/Storefront';
import { products } from '@/lib/products';

export default function HomePage() {
  return <Storefront products={products} />;
}
