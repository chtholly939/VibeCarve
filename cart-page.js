function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p style='text-align:center;'>Your cart is empty !!!</p>";
    cartTotalEl.textContent = "0";
    return;
  }

  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItemsEl.innerHTML += `
      <div class="cart-item">
        <div class="cart-left">
          <img src="${item.image}" alt="${item.name}" class="cart-img" />
        </div>

        <div class="cart-middle">
          <h3>${item.name}</h3>
          <p class="cart-price">₹${item.price}</p>
        </div>

        <div class="cart-right">
          <div class="qty-controls">
            <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" onclick="increaseQty(${index})">+</button>
          </div>

          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  cartTotalEl.textContent = total;
}

// Increasequantity
function increaseQty(index) {
  const cart = getCart();
  cart[index].qty += 1;
  saveCart(cart);
  renderCart();
}

// Decreasequantity
function decreaseQty(index) {
  const cart = getCart();
  cart[index].qty -= 1;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

// Removeitem
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Clearcart
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout feature coming soon!!");
});

renderCart();
updateCartCount();
