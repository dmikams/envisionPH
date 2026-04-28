// ===========================
// ENVISION PHILIPPINES — JS
// ===========================

(function () {
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
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const allLinks = navLinks.querySelectorAll('a');
    allLinks.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    // Close menu when clicking outside (optional)
    document.addEventListener('click', function (event) {
      if (!navbar.contains(event.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// --- (HOME) PROJECT JS ---

(function () {
  const track = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');

  if (!track) return;

  const slides = track.querySelectorAll('.project-slide');
  const SCROLL_AMOUNT = 320; // px per arrow click

  // ---- Build dots ----
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      slides[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.carousel-dot');

  // ---- Update active dot & button states ----
  function updateUI() {
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    // Buttons
    if (prevBtn) prevBtn.disabled = scrollLeft <= 4;
    if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 4;

    // Active dot — find which slide is most visible
    let closest = 0;
    let minDist = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft - scrollLeft - 24);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }

  track.addEventListener('scroll', updateUI, { passive: true });
  updateUI();

  // ---- Arrow buttons ----
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    });
  }

  // ---- Drag to scroll (mouse) ----
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollStart = track.scrollLeft;
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollStart - walk;
  });

  // ---- Touch swipe ----
  let touchStartX = 0;
  let touchScrollStart = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchScrollStart = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const dx = touchStartX - e.touches[0].clientX;
    track.scrollLeft = touchScrollStart + dx;
  }, { passive: true });

})();

class NumberCounter {
  constructor(element, targetValue, hasPlus = false) {
    this.element = element;
    this.target = targetValue;
    this.hasPlus = hasPlus;
    this.current = 0;
    this.shufflePhase = true;
    this.shuffleSteps = 15;
    this.currentStep = 0;
  }
  
  start() {
    this.animate();
  }
  
  animate() {
    if (this.shufflePhase) {
      // Random numbers between 0 and target+100
      const randomVal = Math.floor(Math.random() * (this.target + 100));
      this.element.innerText = randomVal + (this.hasPlus ? '+' : '');
      this.currentStep++;
      
      if (this.currentStep >= this.shuffleSteps) {
        this.shufflePhase = false;
        this.currentStep = 0;
        this.startTime = performance.now();
        this.countUp();
      } else {
        requestAnimationFrame(() => setTimeout(() => this.animate(), 40));
      }
    }
  }
  
  countUp() {
    const duration = 1500;
    const now = performance.now();
    const elapsed = now - this.startTime;
    const progress = Math.min(1, elapsed / duration);
    
    // Easing function
    const ease = 1 - Math.pow(1 - progress, 4);
    const value = Math.floor(ease * this.target);
    
    this.element.innerText = value + (this.hasPlus ? '+' : '');
    
    if (progress < 1) {
      requestAnimationFrame(() => this.countUp());
    } else {
      this.element.innerText = this.target + (this.hasPlus ? '+' : '');
    }
  }
}

// Initialize all counters
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const counters = [];
  
  statNumbers.forEach(el => {
    const text = el.innerText;
    const match = text.match(/(\d+)(\+?)/);
    if (match) {
      const target = parseInt(match[1]);
      const hasPlus = match[2] === '+';
      const counter = new NumberCounter(el, target, hasPlus);
      counters.push(counter);
    }
  });
  
  // Trigger when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => counter.start());
        observer.disconnect(); // Only trigger once
      }
    });
  }, { threshold: 0.3 });
  
  const section = document.querySelector('.chapters-map');
  if (section) observer.observe(section);
}

document.addEventListener('DOMContentLoaded', initNumberCounters);