# Cowboy Supply Order

Next.js and Supabase foundation for cowboy boot care supply ordering.

## What is included

- Next.js App Router project
- Product browsing, search, filters, product detail pages, and cart
- Order request API route with Supabase insert support
- Login modal prepared for Supabase OAuth and email magic links
- Admin surface for catalog/order status
- Supabase schema for products, orders, order items, profiles, and RLS policies

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Run the app:

```bash
npm run dev
```

## Supabase setup

Create a Supabase project, open the SQL editor, and run `supabase/schema.sql`.

Until the Supabase environment variables are set, order requests return a preview confirmation instead of writing to the database. Once the variables are present and the schema exists, requests are inserted into `orders` and `order_items`.

## Vercel setup

Import this GitHub repository into Vercel as a Next.js project. Add the same two Supabase environment variables in Vercel project settings, then deploy from `main` after this branch is merged.
