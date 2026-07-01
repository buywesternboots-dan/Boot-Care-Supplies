import { NextResponse } from 'next/server';
import { products } from '@/lib/products';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type OrderItemInput = {
  productId: string;
  quantity: number;
};

type OrderInput = {
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  items: OrderItemInput[];
};

function orderNumber() {
  return `REQ-${Date.now().toString().slice(-8)}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<OrderInput>;
  const customerName = body.customerName?.trim();
  const customerEmail = body.customerEmail?.trim();
  const paymentMethod = body.paymentMethod?.trim() || 'Other';
  const requestedItems = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const lines = requestedItems
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      const quantity = Number(item.quantity);

      if (!product || !Number.isFinite(quantity) || quantity <= 0) {
        return null;
      }

      return {
        product,
        quantity,
        unitPrice: product.price,
        lineTotal: Number((product.price * quantity).toFixed(2))
      };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  if (lines.length === 0) {
    return NextResponse.json({ error: 'Add at least one item.' }, { status: 400 });
  }

  const number = orderNumber();
  const total = Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2));
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({
      orderNumber: number,
      stored: false,
      total,
      message: 'Order preview created. Add Supabase environment variables to store requests.'
    });
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: number,
      customer_name: customerName,
      customer_email: customerEmail,
      payment_method: paymentMethod,
      status: 'requested',
      total
    })
    .select('id, order_number')
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: orderError?.message || 'Order could not be saved.' }, { status: 500 });
  }

  const { error: itemError } = await supabase.from('order_items').insert(
    lines.map((line) => ({
      order_id: order.id,
      product_id: line.product.id,
      item_number: line.product.itemNumber,
      product_name: line.product.name,
      quantity: line.quantity,
      unit_price: line.unitPrice,
      line_total: line.lineTotal
    }))
  );

  if (itemError) {
    return NextResponse.json({ error: itemError.message }, { status: 500 });
  }

  return NextResponse.json({ orderNumber: order.order_number, stored: true, total });
}
