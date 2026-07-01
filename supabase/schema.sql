create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  item_number text not null unique,
  name text not null,
  brand text not null,
  category text not null check (category in ('Care', 'Repair', 'Accessories')),
  wholesale numeric(10,2) not null,
  price numeric(10,2) not null,
  unit text not null,
  inventory integer,
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  payment_method text not null,
  status text not null default 'requested' check (status in ('requested', 'approved', 'ordered', 'received', 'cancelled')),
  total numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  item_number text not null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Profiles read own profile"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "Profiles update own profile"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "Products visible to everyone"
  on public.products for select
  using (active = true or public.is_admin());

create policy "Admins manage products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can create order requests"
  on public.orders for insert
  with check (true);

create policy "Users read own orders"
  on public.orders for select
  using (user_id = auth.uid() or public.is_admin());

create policy "Admins update orders"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Anyone can add order items"
  on public.order_items for insert
  with check (true);

create policy "Users read own order items"
  on public.order_items for select
  using (
    public.is_admin()
    or exists (
      select 1
      from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );
