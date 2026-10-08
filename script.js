'use strict';
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project');
const count = document.getElementById('result-count');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  projects.forEach(project => {
    const show = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter;
    project.hidden = !show;
    if (show) visible++;
  });
  count.textContent = `${visible} public repositories`;
}));
const demoToggle = document.getElementById('demo-toggle');
const demoImage = document.getElementById('demo-image');
demoToggle.addEventListener('click', () => {
  const playing = demoToggle.getAttribute('aria-pressed') !== 'true';
  demoImage.src = playing ? 'assets/openvla-demo.gif' : 'assets/openvla-still.png';
  demoToggle.setAttribute('aria-pressed', String(playing));
  demoToggle.textContent = playing ? 'Stop demo' : 'Play demo';
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealItems = document.querySelectorAll('.section-head, .feature, .experiment-row, .project, .timeline-item, .racing, .about > div');
  revealItems.forEach(item => item.classList.add('reveal'));
  document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 24px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
}

const progress = document.querySelector('.scroll-progress');
const updateProgress = () => {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const field = document.querySelector('.hero-field');
const context = field?.getContext('2d');
if (context) {
  const hero = field.closest('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0;
  let height = 0;
  let pointer = { x: .5, y: .5 };
  let frame = 0;
  let lastDraw = 0;
  let visible = true;

  const resizeField = () => {
    const rect = field.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    field.width = Math.round(width * ratio);
    field.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (reducedMotion.matches) drawField(0);
  };

  const drawField = time => {
    context.clearRect(0, 0, width, height);
    const t = time * .0003;
    const start = Math.max(width * .27, 0);
    for (let line = 0; line < 26; line++) {
      const base = height * (.11 + line * .033);
      const gradient = context.createLinearGradient(start, 0, width, 0);
      gradient.addColorStop(0, 'rgba(193,226,210,0)');
      gradient.addColorStop(.55, `rgba(193,226,210,${.07 + line * .0015})`);
      gradient.addColorStop(1, `rgba(233,177,141,${.12 + line * .0015})`);
      context.beginPath();
      for (let x = start; x <= width + 12; x += 12) {
        const y = base
          + Math.sin(x * .009 + t + line * .32) * 22
          + Math.sin(x * .003 - t * .7 + line * .19) * 31
          + (pointer.y - .5) * 18 * (x / width);
        if (x === start) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = gradient;
      context.lineWidth = line % 6 === 0 ? 1.1 : .65;
      context.stroke();
    }
    const orbitX = width * (.77 + (pointer.x - .5) * .035);
    const orbitY = height * (.47 + (pointer.y - .5) * .04);
    for (let ring = 0; ring < 3; ring++) {
      context.beginPath();
      context.ellipse(orbitX, orbitY, 145 + ring * 74, 90 + ring * 47, -.3 + t * .08, 0, Math.PI * 2);
      context.strokeStyle = `rgba(235,176,143,${.12 - ring * .025})`;
      context.lineWidth = 1;
      context.stroke();
    }
  };

  const animateField = time => {
    if (time - lastDraw > 32) {
      drawField(time);
      lastDraw = time;
    }
    frame = requestAnimationFrame(animateField);
  };
  const syncMotion = () => {
    cancelAnimationFrame(frame);
    if (!reducedMotion.matches && visible && !document.hidden) frame = requestAnimationFrame(animateField);
    else drawField(0);
  };

  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    pointer = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  window.addEventListener('resize', resizeField);
  resizeField();
  syncMotion();
}
