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


/* =========================
   PROGRESS BAR
========================= */

const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = progress + "%";
});

// CIRCUIT GRID
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const spacing = 80;

function createGrid() {
  nodes = [];

  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: Math.random() * 0.3,
        vy: Math.random() * 0.3
      });
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // lines
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(217,119,6,0.08)";
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // nodes
  for (let n of nodes) {
    n.x += Math.sin(Date.now() * 0.0005 + n.baseX) * 0.2;
    n.y += Math.cos(Date.now() * 0.0005 + n.baseY) * 0.2;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(217,119,6,0.4)";
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

createGrid();
draw();

// RESIZE
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createGrid();
});

// mobile toggle 
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.querySelector(".nav__links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
