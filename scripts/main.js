// Smooth scroll for all anchor links (safe)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return; // ✅ prevents crash if target doesn't exist
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===================
// 🌗 THEME TOGGLE (SAFE)
// ===================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// ===================
// ✅ NAV MENU TOGGLE (MOBILE) — class toggle (NO style.display)
// starts CLOSED by default, closes on link + outside + ESC, toggles open/close on button
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  const closeMenu = () => navLinks.classList.remove("open");
  const toggleMenu = () => navLinks.classList.toggle("open");

  // ✅ make sure it NEVER loads open
  closeMenu();

  // Toggle via button (open + close)
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent outside-click handler from firing
    toggleMenu();
  });

  // Close when any nav link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Close if click outside (only when open)
  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("open")) return;
    if (menuBtn.contains(e.target)) return;
    if (navLinks.contains(e.target)) return;
    closeMenu();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close when switching back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
});

// ===================
// ☰ BLOG MENU TOGGLE (WORKING)
// (toggle button now closes too)
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("menuPanel");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("menuClose");

  if (!toggle || !panel || !overlay) return;

  const isOpen = () => panel.classList.contains("open");

  const openMenu = () => {
    panel.classList.add("open");
    overlay.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    if (isOpen()) closeMenu();
    else openMenu();
  };

  // ✅ clicking the menu button toggles open/close
  toggle.addEventListener("click", toggleMenu);

  // close on overlay + X
  overlay.addEventListener("click", closeMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // ✅ close if you click any link inside the panel
  panel.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

// ===================
// ⚠️ CONTENT WARNING (button version)
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("glimpseLink");
  if (!btn) return;

  const overlay = document.getElementById("cwOverlay");
  const btnCancel = document.getElementById("cwCancel");
  const btnProceed = document.getElementById("cwProceed");
  const remember = document.getElementById("cwRemember");

  const KEY = "bd_writing_warning_ok";

  // If modal elements are missing, don't crash
  if (!overlay) return;

  const openModal = () => {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  const goToWriting = () => {
    window.location.href = "./writing.html";
  };

  btn.addEventListener("click", () => {
    const alreadyOk = localStorage.getItem(KEY) === "1";
    if (alreadyOk) return goToWriting();
    openModal();
  });

  if (btnCancel) btnCancel.addEventListener("click", closeModal);

  if (btnProceed) {
    btnProceed.addEventListener("click", () => {
      if (remember && remember.checked) localStorage.setItem(KEY, "1");
      closeModal();
      goToWriting();
    });
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
