
// Add basic scroll reveal effect
window.addEventListener('scroll', () => {
  document.querySelectorAll('.project').forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.project').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.6s ease';
});
