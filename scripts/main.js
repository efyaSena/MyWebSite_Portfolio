// Smooth scroll for all anchor links (safe)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return; // ✅ prevents crash if target doesn't exist
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


// ===================
// 🌗 THEME TOGGLE (SAFE)
// ===================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}


// ===================
// ✅ NAV MENU TOGGLE (MOBILE) — class toggle (NO style.display)
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Optional nice UX: close menu when you click a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    // Optional: close menu if you tap outside (only when open)
    document.addEventListener("click", (e) => {
      if (!navLinks.classList.contains("open")) return;
      if (e.target === menuBtn || menuBtn.contains(e.target)) return;
      if (e.target === navLinks || navLinks.contains(e.target)) return;
      navLinks.classList.remove("open");
    });

    // Optional: close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") navLinks.classList.remove("open");
    });
  }
});


// ===================
// ☰ BLOG MENU TOGGLE (WORKING)
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("menuPanel");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("menuClose");

  if (!toggle || !panel || !overlay) return;

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

  toggle.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

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
    if (alreadyOk) {
      goToWriting();
      return;
    }
    openModal();
  });

  if (btnCancel) btnCancel.addEventListener("click", closeModal);

  if (btnProceed) {
    btnProceed.addEventListener("click", () => {
      if (remember && remember.checked) {
        localStorage.setItem(KEY, "1");
      }
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
