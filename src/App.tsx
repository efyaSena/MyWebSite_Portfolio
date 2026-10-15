import { useEffect } from 'react';
import './styles/main.css';

function App() {
  useEffect(() => {
    const menuBtn = document.getElementById('menuBtn') as HTMLButtonElement | null;
    const navLinks = document.querySelector('.nav-links') as HTMLElement | null;
    const themeToggle = document.getElementById(
      'theme-toggle',
    ) as HTMLButtonElement | null;

    const glimpseLink = document.getElementById('glimpseLink');
    const cwOverlay = document.getElementById('cwOverlay');
    const cwCancel = document.getElementById('cwCancel');
    const cwProceed = document.getElementById('cwProceed');
    const cwRemember = document.getElementById(
      'cwRemember',
    ) as HTMLInputElement | null;

    const remembered = localStorage.getItem('cwAccepted') === 'true';

    const applyTheme = (theme: 'dark' | 'light') => {
      const isDark = theme === 'dark';
      document.body.classList.toggle('dark-mode', isDark);

      if (themeToggle) {
        themeToggle.setAttribute(
          'aria-label',
          isDark ? 'Switch to light mode' : 'Switch to dark mode',
        );
      }
    };

    const closeMenu = () => {
      if (!navLinks) return;
      navLinks.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      if (!navLinks) return;
      const isOpen = navLinks.classList.toggle('open');
      menuBtn?.setAttribute('aria-expanded', String(isOpen));
    };

    const toggleTheme = () => {
      const nextTheme = document.body.classList.contains('dark-mode')
        ? 'light'
        : 'dark';
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!navLinks?.classList.contains('open')) return;
      if (menuBtn?.contains(target) || navLinks.contains(target)) return;
      closeMenu();
    };

    const handleResize = () => {
      if (window.innerWidth > 768) closeMenu();
    };

    const openWarning = () => {
      if (remembered) {
        window.location.href = new URL('writing.html', window.location.href).href;
        return;
      }
      cwOverlay?.classList.add('open');
      cwOverlay?.classList.add('show');
      cwOverlay?.setAttribute('aria-hidden', 'false');
    };

    const closeWarning = () => {
      cwOverlay?.classList.remove('open');
      cwOverlay?.classList.remove('show');
      cwOverlay?.setAttribute('aria-hidden', 'true');
    };

    const proceedToWriting = () => {
      if (cwRemember?.checked) {
        localStorage.setItem('cwAccepted', 'true');
      }
      window.location.href = new URL('writing.html', window.location.href).href;
    };

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    menuBtn?.addEventListener('click', toggleMenu);
    themeToggle?.addEventListener('click', toggleTheme);
    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('resize', handleResize);
    glimpseLink?.addEventListener('click', openWarning);
    cwCancel?.addEventListener('click', closeWarning);
    cwProceed?.addEventListener('click', proceedToWriting);

    return () => {
      menuBtn?.removeEventListener('click', toggleMenu);
      themeToggle?.removeEventListener('click', toggleTheme);
      navLinks?.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('resize', handleResize);
      glimpseLink?.removeEventListener('click', openWarning);
      cwCancel?.removeEventListener('click', closeWarning);
      cwProceed?.removeEventListener('click', proceedToWriting);
    };
  }, []);

  return (
    <>
      <header>
        <nav className="container">
          <button
            className="menu-btn"
            id="menuBtn"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
          >
            ☰
          </button>

          <ul className="nav-links" id="site-nav">
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#writing">I Write Sometimes</a>
            </li>
            <li>
              <a href="#skills">Tech Stack</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <button
            id="theme-toggle"
            className="theme-btn"
            aria-label="Switch to dark mode"
            type="button"
          >
            <svg
              className="theme-icon theme-icon--moon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.6 8.6 0 1 0 20.2 15.3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="theme-icon theme-icon--sun"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </header>

      <section id="hero" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Hello there 👋🏼!</h2>
            <h3>Welcome to my own little corner of the web 🌍.</h3>
            <p className="tagline">
              “Code that solves problems, one product at a time.”
            </p>
            <a href="#projects" className="btn">
              View My Work
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="about container">
        <h1>About Me</h1>

        <div className="about-content">
          <div className="about-text">
            <p>Hello again 👋🏽! I’m Efya or Sena.</p>

            <h3>
              — a big cat and dog lover 🐱, Frontend Magician ✨, soon to be
              fully embedded in full-stack-ing 🚀!
            </h3>

            <p>
              My <strong>friends</strong> call me Remedy (Rems) or BabyDaddy, as
              a self-taught survivalist 💪🏽 who’s mastered the fine art of{' '}
              <strong>Googling errors</strong>, reading documentation 📚, and
              pushing through those <strong>“why isn’t this working?!”</strong>{' '}
              moments.
            </p>

            <p>
              I love crafting clean, user-friendly websites with great attention
              to details — transforming ideas into beautiful, functional digital
              realities 💡. Every project is a chance to explore new ideas,
              sharpen my skills, and build experiences that leave a mark. I’m
              always exploring new challenges and opportunities to expand my
              skills and connect with like-minded builders and dreamers ✨.
            </p>

            <blockquote className="quote">
              <h3>
                "Logic will get you from point A to point B. Imagination will
                take you everywhere." — Albert Einstein
              </h3>
            </blockquote>

            <ul className="highlights">
              <li>🌍 Rooted in Ghana, inspired by the world</li>
              <li>💡 Passionate about intuitive UI/UX design</li>
              <li>
                🚀 Continuously evolving from frontend craft to full-stack
                expertise
              </li>
            </ul>
          </div>

          <div className="about-img">
            <img src="/media/car pic.jpg" alt="Efya Sena portrait" />
          </div>
        </div>
      </section>

      <section id="projects" className="projects container">
        <h2>Projects</h2>

        <div className="featured-project">
          <div className="featured-left">
            <p className="badge">⭐ Featured Project</p>
            <h3 className="featured-title">BD Rhythm — Music Discovery App</h3>

            <p className="featured-desc">
              A genre-driven music discovery experience focused on smooth
              navigation, state-driven UI updates, and intuitive player
              interactions.
            </p>

            <ul className="featured-points">
              <li>Genre-based discovery with dynamic sections</li>
              <li>Smooth scrolling UI patterns + clean component layout</li>
              <li>Player flow: artist → songs → categories</li>
            </ul>

            <p className="featured-tech">React • Tailwind CSS • JavaScript</p>

            <div className="project-links">
              <a
                className="btn"
                href="https://bd-rythm.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>

              <a
                className="btn btn-outline"
                href="https://github.com/efyaSena/Music-Player-App"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="featured-right">
            <img src="/media/portfolio img.jpg" alt="BD Rhythm preview" />
          </div>
        </div>

        <div className="project-grid">
          <div className="project-card">
            <img src="/media/bdauralogo.jpg" alt="Bdaura Collection preview" />
            <h3>Bdaura Collection</h3>
            <p>
              A product showcase website for my hair extension business — built
              to present collections clearly, improve browsing flow, and
              highlight key products.
            </p>
            <p className="tech">HTML • CSS • JavaScript</p>

            <a
              href="https://efyasena.github.io/bdauraCollection/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              View Project
            </a>
          </div>

          <div className="project-card">
            <img
              src="/media/portfolio img.jpg"
              alt="Portfolio Website preview"
            />
            <h3>Portfolio Website</h3>
            <p>
              A clean personal portfolio designed for fast performance, smooth
              navigation, and a strong visual identity. Includes theme toggle +
              responsive layout.
            </p>
            <p className="tech">HTML • CSS • JavaScript</p>

            <div className="project-links">
              <a
                className="btn btn-primary"
                href="https://www.efyasena.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>

              <a
                className="btn btn-outline"
                href="https://github.com/efyaSena/Music-Player-App"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="writing" className="writing container">
        <div className="writing-content">
          <div className="writing-img">
            <img src="/media/IWS pic.jpg" alt="Writing illustration" />
          </div>

          <div className="writing-text">
            <h2>I Write Sometimes ✍🏽</h2>

            <p className="intro">
              Beyond code, I express myself in words. Sometimes they turn into
              poems, short stories, and other times into reflections that live
              rent-free in my Notes app.
            </p>

            <p>
              When I’m not coding, I write. Words, like code, can build worlds —
              short stories, poems, and musings living inside a little side
              project I’ve got going on. It’s got a digital home on its own.
            </p>

            <button type="button" className="glimpse-btn" id="glimpseLink">
              Here’s a glimpse into that world{' '}
              <span className="glimpse-arrow">▾</span>
            </button>
          </div>
        </div>
      </section>

      <section id="skills" className="skills container">
        <h2>🧠 My Tech Stack</h2>

        <div className="skills-list">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>Python</span>
          <span>React</span>
          <span>Git / GitHub</span>
          <span>Responsive UI/UX Design</span>
          <span>Debugging</span>
          <span>Agile Methodologies</span>
          <span>Node.JS (In-Progress)</span>
          <span>Wireframes / Figma</span>
          <span>VS Code</span>
          <span>Canva</span>
          <span>🎨 Painting</span>
        </div>
      </section>

      <section id="contact" className="contact container">
        <h2>Let’s Collaborate 🤝</h2>
        <p>If you got any questions or simply want to make a contribution...</p>
        <p>Let’s build something amazing together.!</p>
        <p>Feel free to reach out through any of the links below 👇🏽</p>

        <ul className="contact-links">
          <li>
            <a href="tel:+233249937358" aria-label="Phone">
              <img src="/media/phone icon.gif" alt="Phone Icon" />
            </a>
          </li>

          <li>
            <a href="mailto:kumedzrosenagifty@gmail.com" aria-label="Email">
              <img src="/media/email icon.png" alt="Email Icon" />
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/_babydadi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/media/instagram logo.png" alt="Instagram Icon" />
            </a>
          </li>

          <li>
            <a
              href="https://www.tiktok.com/@babydaddy_4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <img src="/media/tiktok logo.png" alt="TikTok Icon" />
            </a>
          </li>

          <li>
            <a
              href="https://github.com/efyaSena"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img src="/media/github icon.png" alt="GitHub Icon" />
            </a>
          </li>

          <li>
            <a href="/media/Resume.pdf" download aria-label="Download Resume">
              <img src="/media/download icon.gif" alt="Download Resume Icon" />
            </a>
          </li>
        </ul>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Efya Sena. Built with 💙 and caffeine ☕.</p>
        </div>
      </footer>

      <div className="cw-overlay" id="cwOverlay" aria-hidden="true">
        <div
          className="cw-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cwTitle"
        >
          <h3 className="cw-title" id="cwTitle">
            Content Warning
          </h3>

          <p className="cw-text">
            This section contains explicit, adult-themed writing (18+). Proceed
            only if you’re comfortable.
          </p>

          <div className="cw-actions">
            <button
              type="button"
              className="cw-btn cw-btn--ghost"
              id="cwCancel"
            >
              Maybe later
            </button>
            <button
              type="button"
              className="cw-btn cw-btn--primary"
              id="cwProceed"
            >
              Enter
            </button>
          </div>

          <label className="cw-check">
            <input type="checkbox" id="cwRemember" />
            <span>Don’t show this again</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
