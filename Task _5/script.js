// 1. Application State
const products = [
    { id: 1, name: 'Keyboard', price: 25.50 },
    { id: 2, name: 'Mouse', price: 12.00 },
    { id: 3, name: 'Monitor', price: 149.99 },
    { id: 4, name: 'USB Hub', price: 18.75 }
];

// Cart state object: maps product ID to quantity
let cart = {};

// 2. Initial Render of Products
const productList = document.getElementById('product-list');
products.forEach(p => {
    productList.innerHTML += `
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${p.name}</h5>
                    <p class="card-text text-muted">$${p.price.toFixed(2)}</p>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">Add to cart</button>
                </div>
            </div>
        </div>
    `;
});

// 3. Core Cart Functions
function addToCart(id) {
    // If item exists, increment. Otherwise, set to 1.
    cart[id] = (cart[id] || 0) + 1;
    updateCartUI();
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id]--;
        // Clean up the object if quantity hits 0
        if (cart[id] === 0) delete cart[id];
    }
    updateCartUI();
}

// 4. UI Update Engine
function updateCartUI() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartBadgeEl = document.getElementById('cart-badge');

    cartItemsEl.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    const cartKeys = Object.keys(cart);

    if (cartKeys.length === 0) {
        cartItemsEl.innerHTML = '<li class="list-group-item text-muted">Cart is empty</li>';
    } else {
        cartKeys.forEach(id => {
            // Find product data
            const product = products.find(p => p.id == id);
            const qty = cart[id];
            const itemTotal = product.price * qty;

            // Update running totals
            totalPrice += itemTotal;
            totalItems += qty;

            // Inject cart item HTML
            cartItemsEl.innerHTML += `
                <li class="list-group-item cart-item">
                    <span>${product.name} x ${qty}</span>
                    <div>
                        <span class="me-2">$${itemTotal.toFixed(2)}</span>
                        <button class="btn btn-outline-danger btn-sm px-2 py-0 fw-bold" onclick="removeFromCart(${id})">-</button>
                    </div>
                </li>
            `;
        });
    }

    // Update DOM Elements
    cartTotalEl.innerText = totalPrice.toFixed(2);
    cartBadgeEl.innerText = totalItems;
}
