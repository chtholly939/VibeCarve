// ===============================
// Global Cart Functions
// ===============================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;

  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  cartCount.textContent = totalQty;

  // ✅ OPTION A: Keep badge visible always (show 0)
  cartCount.style.display = "inline-block";

  // ✅ OPTION B: Hide badge when 0 (remove this if you want always visible)
  // cartCount.style.display = totalQty > 0 ? "inline-block" : "none";
}

// ===============================
// Navbar + Menu Code
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (navLinks && openMenu && closeMenu) {
    openMenu.addEventListener("click", () => navLinks.classList.add("show"));
    closeMenu.addEventListener("click", () => navLinks.classList.remove("show"));
  }

  // ✅ Update badge on page load
  setTimeout(updateCartCount, 200);

  // ===============================
// Scroll Reveal Animation
// ===============================
const revealElements = document.querySelectorAll(
  ".shop-card, .product, .gallery-item, .feature-card, .card"
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

// Add reveal class initially
revealElements.forEach((el) => el.classList.add("reveal"));

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

});
