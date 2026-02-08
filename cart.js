function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = totalItems;
}

document.querySelectorAll(".cart-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    
    const image = btn.dataset.image || "";

    let cart = getCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, image, qty: 1 });
    }

    saveCart(cart);
    updateCartCount();

    alert(`${name} added to cart `);
  });
});

updateCartCount();