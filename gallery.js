// ===============================
// Gallery Page Lightbox
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-page-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  if (!images.length || !lightbox || !lightboxImg || !lightboxClose) return;

  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });
});