// ===============================
// Shop Page JS (Filter + Search + Cart)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".shop-card");
  const searchInput = document.getElementById("searchInput");
  const addCartBtns = document.querySelectorAll(".add-cart-btn");
  const cartCount = document.getElementById("cartCount");

  // -----------------------------
  // CART FUNCTIONS (localStorage)
  // -----------------------------
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = totalQty;
  }

  // Add to cart
  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      const image = btn.dataset.image;

      let cart = getCart();

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ id, name, price, image, qty: 1 });
      }

      saveCart(cart);
      updateCartCount(); 

      btn.textContent = "Added !!";
      setTimeout(() => {
        btn.textContent = "Add to Cart";
      }, 900);
    });
  });

  updateCartCount();

  // -----------------------------
  // FILTER PRODUCTS
  // -----------------------------
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active-filter"));
      btn.classList.add("active-filter");

      const filterValue = btn.dataset.filter;

      productCards.forEach((card) => {
        const category = card.dataset.category;

        if (filterValue === "all" || category === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // -----------------------------
  // SEARCH PRODUCTS
  // -----------------------------
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();

      productCards.forEach((card) => {
        const name = card.dataset.name.toLowerCase();

        if (name.includes(searchValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});
