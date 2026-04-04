document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".glimpse-btn");
  const section = document.querySelector("section.writing");

  if (!btn || !section) return;

  btn.addEventListener("click", () => {
    section.classList.toggle("open");
  });
});
