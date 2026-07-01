'use client';

import Link from 'next/link';
import { LogIn, ShoppingCart } from 'lucide-react';

type HeaderProps = {
  cartCount?: number;
  onLogin?: () => void;
};

export default function Header({ cartCount = 0, onLogin }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brandmark">
          <span className="mark">BS</span>
          <span>
            <span>Boot Supply Order</span>
            <span className="small-copy">Care, repair, accessories</span>
          </span>
        </Link>
        <nav className="nav-actions" aria-label="Primary navigation">
          <Link className="ghost-action" href="/#products">
            Products
          </Link>
          <Link className="ghost-action" href="/admin">
            Admin
          </Link>
          {onLogin ? (
            <button className="ghost-action" type="button" onClick={onLogin}>
              <LogIn size={16} />
              Login
            </button>
          ) : null}
          <a className="primary-action" href="/#cart">
            <ShoppingCart size={16} />
            Cart {cartCount ? `(${cartCount})` : ''}
          </a>
        </nav>
      </div>
    </header>
  );
}
