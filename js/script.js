// ===========================
// ENVISION PHILIPPINES — JS
// ===========================

// ===========================
// NAVBAR SCROLL & HAMBURGER
// ===========================

(function() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Scroll effect: add 'scrolled' class when page is scrolled
  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // call on load

  // Hamburger menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const allLinks = navLinks.querySelectorAll('a');
    allLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    // Close menu when clicking outside (optional)
    document.addEventListener('click', function(event) {
      if (!navbar.contains(event.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

 /* Scroll fade-in animations */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .principle-card').forEach(el => observer.observe(el));

// --- INTERSECTION OBSERVER: fade-in + principle cards ---
const observerOptions = { threshold: 0.15 };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .principle-card').forEach(el => {
  fadeObserver.observe(el);
});

// Stagger principle cards using delay attribute
document.querySelectorAll('.principle-card').forEach(card => {
  const delay = card.getAttribute('data-delay') || 0;
  card.style.transitionDelay = delay + 'ms';
});

// --- MEMBERSHIP ROLE BADGE TOGGLE ---
document.querySelectorAll('.role-badge').forEach(badge => {
  badge.addEventListener('click', () => {
    document.querySelectorAll('.role-badge').forEach(b => b.classList.remove('active'));
    badge.classList.add('active');
    // Autofill the select if it matches
    const select = document.getElementById('role');
    if (select) {
      const val = badge.textContent.trim();
      for (let option of select.options) {
        if (option.value === val) {
          select.value = val;
          break;
        }
      }
    }
  });
});

// --- CONTACT FORM SUBMISSION ---
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    successMsg.classList.remove('hidden');
    form.reset();
    document.querySelectorAll('.role-badge').forEach(b => b.classList.remove('active'));
    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => successMsg.classList.add('hidden'), 5000);
  }, 1200);
});

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#fff';
    }
  });
}, { passive: true });
