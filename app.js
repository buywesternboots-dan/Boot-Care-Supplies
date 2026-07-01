const markup = 1.10;

// Starter products. Replace or extend with the full cleaned item list.
const products = [
  { sku: '09139', name: 'Boot Hook Long Pair', category: 'Accessories', brand: 'Justin Blair', wholesale: 9.00, uom: 'PR', inventory: null },
  { sku: '09140', name: 'Boot Hook Short Pair', category: 'Accessories', brand: 'Justin Blair', wholesale: 8.30, uom: 'PR', inventory: null },
  { sku: '39155', name: 'Boot Shaper with Handle, Gold', category: 'Accessories', brand: '', wholesale: 16.00, uom: 'PR', inventory: 41 },
  { sku: '126029', name: 'Boot Weights - 1 lb, Case 12 pcs', category: 'Accessories', brand: 'Justin Blair', wholesale: 43.20, uom: 'CS', inventory: 472 },
  { sku: '17928', name: 'Boot Roll Up, Clear, 26", Sold by the Dozen', category: 'Accessories', brand: 'Justin Blair', wholesale: 110.00, uom: 'CS', inventory: 6 },
  { sku: '27830', name: 'BootRescue Boot Cleaning Wipes, 10 Individually-Wrapped Wipes', category: 'Care', brand: 'BootRescue', wholesale: 4.00, uom: 'EA', inventory: 3168 },
  { sku: '27831', name: 'BootRescue Boot Cleaning Wipes, 15 Wipes Resealable Pouch', category: 'Care', brand: 'BootRescue', wholesale: 4.00, uom: 'EA', inventory: 7546 },
  { sku: '27886', name: 'BootRescue All-Natural Protector Spray, 6 oz', category: 'Care', brand: 'BootRescue', wholesale: 8.50, uom: 'EA', inventory: 1244 },
  { sku: '39187', name: 'Griffin Authentic Western Boot Leather Conditioner, 8 oz', category: 'Care', brand: 'Griffin', wholesale: 5.00, uom: 'EA', inventory: 15 },
  { sku: '39188', name: 'Griffin Authentic Western Boot Water & Stain Repellent Spray, 8 oz', category: 'Care', brand: 'Griffin', wholesale: 5.00, uom: 'EA', inventory: 16 },
  { sku: '39189', name: 'Griffin Authentic Western Boot Oil, 8 oz', category: 'Care', brand: 'Griffin', wholesale: 5.00, uom: 'EA', inventory: 35 },
  { sku: '17799', name: "Fiebing's Sole & Heel Dressing, Black, 4 oz", category: 'Repair', brand: "Fiebing's", wholesale: 3.60, uom: 'EA', inventory: 54 },
  { sku: '17800', name: "Fiebing's Sole & Heel Dressing, Brown, 4 oz", category: 'Repair', brand: "Fiebing's", wholesale: 3.60, uom: 'EA', inventory: 22 }
];

const state = { cart: {} };
const money = n => `$${n.toFixed(2)}`;
const retail = p => Math.round((p.wholesale * markup) * 100) / 100;

function renderProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  products
    .filter(p => cat === 'all' || p.category === cat)
    .filter(p => [p.sku, p.name, p.brand].join(' ').toLowerCase().includes(q))
    .forEach(p => {
      const stock = p.inventory == null ? 'Stock TBD' : p.inventory <= 0 ? 'Backorder' : `${p.inventory} available`;
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb">Image</div>
        <div class="card-body">
          <div class="sku">${p.sku} · ${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="meta"><span>${p.brand || 'Brand TBD'}</span><span>${p.uom}</span></div>
          <div class="meta"><span>${stock}</span></div>
          <div class="price">${money(retail(p))}</div>
          <button class="add-button" data-sku="${p.sku}">Add to Cart</button>
        </div>`;
      grid.appendChild(card);
    });

  document.querySelectorAll('.add-button').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.sku));
  });
}

function addToCart(sku) {
  state.cart[sku] = (state.cart[sku] || 0) + 1;
  renderCart();
}

function changeQty(sku, delta) {
  state.cart[sku] = (state.cart[sku] || 0) + delta;
  if (state.cart[sku] <= 0) delete state.cart[sku];
  renderCart();
}

function renderCart() {
  const wrap = document.getElementById('cartItems');
  wrap.innerHTML = '';
  let subtotal = 0;
  let count = 0;

  Object.entries(state.cart).forEach(([sku, qty]) => {
    const p = products.find(x => x.sku === sku);
    if (!p) return;
    const line = retail(p) * qty;
    subtotal += line;
    count += qty;
    const el = document.createElement('div');
    el.className = 'cart-line';
    el.innerHTML = `
      <div class="cart-line-title">${p.name}</div>
      <div class="sku">${sku} · ${money(retail(p))} each</div>
      <div class="qty-row">
        <button data-sku="${sku}" data-delta="-1">−</button>
        <span>${qty}</span>
        <button data-sku="${sku}" data-delta="1">+</button>
        <strong style="margin-left:auto">${money(line)}</strong>
      </div>`;
    wrap.appendChild(el);
  });

  if (!count) wrap.innerHTML = '<p class="fine-print">No items added yet.</p>';
  document.getElementById('cartCount').textContent = count;
  document.getElementById('subtotal').textContent = money(subtotal);
  document.getElementById('total').textContent = money(subtotal);

  document.querySelectorAll('.qty-row button').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.sku, Number(btn.dataset.delta)));
  });
}

function submitOrder() {
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const items = Object.entries(state.cart);
  if (!items.length) return alert('Add at least one item.');
  if (!name || !email) return alert('Name and email are required.');
  const orderNumber = `REQ-${Date.now().toString().slice(-6)}`;
  document.getElementById('confirmationText').textContent = `${orderNumber} submitted for ${name}. Payment and availability still need confirmation.`;
  document.getElementById('confirmationDialog').showModal();
}

document.getElementById('searchInput').addEventListener('input', renderProducts);
document.getElementById('categoryFilter').addEventListener('change', renderProducts);
document.getElementById('submitOrder').addEventListener('click', submitOrder);
renderProducts();
renderCart();
