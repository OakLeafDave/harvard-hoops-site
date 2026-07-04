document.querySelectorAll('section, footer').forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Nav gains a solid background once the hero has scrolled past.
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Side scene-dot nav tracks whichever section is currently in view.
const dots = document.querySelectorAll('.scene-dot');
const scenes = [...dots].map(dot => document.querySelector(dot.getAttribute('href')));
const sceneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const index = scenes.indexOf(entry.target);
    if (index === -1) return;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
scenes.forEach(scene => scene && sceneObserver.observe(scene));

// Custom cursor dot — desktop only (hidden via CSS on coarse pointers).
const cursor = document.querySelector('.cursor-dot');
if (window.matchMedia('(pointer: fine)').matches) {
  let hovering = false;
  const moveCursor = (x, y) => {
    const scale = hovering ? 1.8 : 1;
    cursor.style.transform = `translate(${x - 13}px, ${y - 13}px) scale(${scale})`;
  };
  window.addEventListener('mousemove', (e) => {
    moveCursor(e.clientX, e.clientY);
    cursor.classList.add('visible');
  }, { passive: true });
  document.querySelectorAll('a, .scene-dot').forEach(el => {
    el.addEventListener('mouseenter', (e) => { hovering = true; moveCursor(e.clientX, e.clientY); });
    el.addEventListener('mouseleave', (e) => { hovering = false; moveCursor(e.clientX, e.clientY); });
  });
}

// Subtle parallax on the hero and footer background photography.
const parallaxEls = document.querySelectorAll('.hero .bleed-bg, footer .bleed-bg');
const onParallax = () => {
  parallaxEls.forEach(el => {
    const rect = el.parentElement.getBoundingClientRect();
    const offset = rect.top * 0.15;
    el.style.transform = `translateY(${offset}px)`;
  });
};
window.addEventListener('scroll', onParallax, { passive: true });
onParallax();
