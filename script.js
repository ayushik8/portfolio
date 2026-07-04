/* =========================
   CURSOR EFFECT
========================= */

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(0.7)";
});

document.addEventListener("mouseup", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

/* =========================
   SCROLL REVEAL (INTERSECTION OBSERVER)
========================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".section, .timeline__item, .project-card, .stat").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   NAVBAR BLUR ON SCROLL
========================= */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.background = "rgba(11, 11, 13, 0.85)";
    nav.style.backdropFilter = "blur(16px)";
  } else {
    nav.style.background = "rgba(11, 11, 13, 0.6)";
  }
});

/* =========================
   TYPING TAGLINE EFFECT
========================= */

const tagline = document.querySelector(".hero__tagline");

const phrases = [
  "Building embedded systems, intelligent software, and human-centered technology.",
  "Embedded systems. Signal processing. Real-world impact.",
  "From flight control systems to neural signals."
];

let phraseIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (typing) {
    tagline.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      typing = false;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    tagline.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, typing ? 35 : 20);
}

typeLoop();

/* =========================
   COUNTER ANIMATION (LEADERSHIP STATS)
========================= */

const counters = document.querySelectorAll(".stat h3");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent.replace("+", ""));
      let count = 0;

      const interval = setInterval(() => {
        count += Math.ceil(target / 40);
        if (count >= target) {
          el.textContent = target + "+";
          clearInterval(interval);
        } else {
          el.textContent = count + "+";
        }
      }, 30);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));

/* =========================
   SMOOTH SCROLL FOR NAV LINKS
========================= */

document.querySelectorAll(".nav__links a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================
   PROJECT CARD HOVER DEPTH (MICRO INTERACTION)
========================= */

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
      perspective(800px)
      rotateX(${(y - rect.height / 2) / 20}deg)
      rotateY(${(x - rect.width / 2) / 20}deg)
      translateY(-6px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

/* =========================
   HERO FADE IN ON LOAD
========================= */

window.addEventListener("load", () => {
  document.querySelector(".hero__content").style.opacity = "1";
  document.querySelector(".hero__content").style.transform = "translateY(0)";
});
