(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function(){
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });

  /* Scroll spy */
  const sections = document.querySelectorAll('main section[id]');
  const links = navLinks.querySelectorAll('a[href^="#"]');
  if('IntersectionObserver' in window){
    const spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          links.forEach(function(l){
            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function(s){ spy.observe(s); });
  }

  /* Waveform draw-in */
  const wavePath = document.querySelector('.waveform path');
  if(wavePath){
    if(prefersReduced){
      wavePath.style.strokeDashoffset = 0;
    } else {
      const len = wavePath.getTotalLength();
      wavePath.style.strokeDasharray = len;
      wavePath.style.strokeDashoffset = len;
      requestAnimationFrame(function(){
        wavePath.style.transition = 'stroke-dashoffset 2.4s ease-out';
        wavePath.style.strokeDashoffset = '0';
      });
    }
  }

  /* Count-up stats */
  const statEls = document.querySelectorAll('.stat-num-val');
  if('IntersectionObserver' in window){
    const statObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const isDecimal = el.dataset.target.indexOf('.') !== -1;
          if(prefersReduced){
            el.textContent = el.dataset.target + suffix;
          } else {
            const duration = 1400;
            const startTime = performance.now();
            (function tick(now){
              const progress = Math.min((now - startTime) / duration, 1);
              const value = target * progress;
              el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
              if(progress < 1) requestAnimationFrame(tick);
            })(startTime);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function(el){ statObserver.observe(el); });
  }

  /* Footer year */
  const yearEl = document.querySelector('.footer-year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();
