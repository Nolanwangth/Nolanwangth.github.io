'use strict';

const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const languageButton = document.getElementById('language-toggle');
const motionButton = document.getElementById('motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let theme = window.sitePreferences?.theme || 'dark';
let language = window.sitePreferences?.language || 'en';
let userPaused = false;
try { userPaused = localStorage.getItem('nolan-motion') === 'paused'; } catch {}
const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
const isPaused = () => userPaused || reducedMotion.matches;

function renderControls() {
  const lightNext = theme === 'dark';
  themeButton.querySelector('[aria-hidden]').textContent = lightNext ? '☼' : '☾';
  themeButton.querySelector('.control-label').textContent = language === 'zh'
    ? (lightNext ? '浅色' : '深色') : (lightNext ? 'Light' : 'Dark');
  themeButton.setAttribute('aria-label', language === 'zh'
    ? (lightNext ? '切换到浅色主题' : '切换到深色主题')
    : (lightNext ? 'Switch to light theme' : 'Switch to dark theme'));
  languageButton.textContent = language === 'en' ? '中文' : 'EN';
  languageButton.lang = language === 'en' ? 'zh-CN' : 'en';
  languageButton.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
  if (!motionButton) return;
  motionButton.disabled = reducedMotion.matches;
  motionButton.setAttribute('aria-pressed', String(isPaused()));
  motionButton.textContent = reducedMotion.matches
    ? (language === 'zh' ? '已减少动态效果' : 'Reduced motion')
    : isPaused() ? (language === 'zh' ? '开启动画' : 'Resume motion')
    : (language === 'zh' ? '暂停动画' : 'Pause motion');
}
function applyTheme() {
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#141a18' : '#f4f1e9';
  renderControls();
  window.dispatchEvent(new Event('themechange'));
}
function applyLanguage() {
  const copy = window.siteContent[language];
  root.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    if (copy[element.dataset.i18n] !== undefined) element.textContent = copy[element.dataset.i18n];
  });
  for (const attribute of ['aria-label', 'alt']) {
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach(element => {
      element.setAttribute(attribute, copy[element.getAttribute(`data-i18n-${attribute}`)]);
    });
  }
  document.title = language === 'zh' ? 'Nolan · Tianhong Wang — 机器人、AI 与企业系统' : 'Nolan · Tianhong Wang — Robotics, AI & Systems';
  if (root.dataset.page) document.title = `${copy[`directions.${root.dataset.page}`]} · Nolan`;
  const description = copy[root.dataset.page ? `page.${root.dataset.page}Description` : 'meta.description'];
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = description;
  renderControls();
  window.dispatchEvent(new Event('languagechange'));
}
themeButton.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  save('nolan-theme', theme);
  applyTheme();
});
languageButton.addEventListener('click', () => {
  language = language === 'en' ? 'zh' : 'en';
  save('nolan-language', language);
  applyLanguage();
});
function syncMotionPreference() {
  root.classList.toggle('motion-paused', isPaused());
  renderControls();
  window.dispatchEvent(new Event('motionchange'));
}
motionButton?.addEventListener('click', () => {
  userPaused = !userPaused;
  save('nolan-motion', userPaused ? 'paused' : 'playing');
  syncMotionPreference();
});
reducedMotion.addEventListener('change', syncMotionPreference);
applyLanguage();
applyTheme();
syncMotionPreference();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .06, rootMargin: '0px 0px 20px 0px' });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  root.classList.add('motion-ready');
}

const progress = document.querySelector('.scroll-progress');
let progressFrame = 0;
function updateProgress() {
  progressFrame = 0;
  const height = root.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0})`;
}
window.addEventListener('scroll', () => {
  if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
}, { passive: true });
window.addEventListener('resize', updateProgress);
window.addEventListener('languagechange', updateProgress);
updateProgress();

// A lightweight line field, drawn at 30 fps and stopped offscreen or on request.
const canvas = document.querySelector('.hero-field');
const context = canvas?.getContext('2d');
if (context) {
  const hero = document.querySelector('.hero');
  let width = 0, height = 0, frame = 0, lastDraw = 0;
  let visible = true;
  let pointerY = .5;
  let fieldColor, accentColor;
  function readPalette() {
    const style = getComputedStyle(root);
    fieldColor = style.getPropertyValue('--field').trim();
    accentColor = style.getPropertyValue('--field-accent').trim();
  }
  function draw(time) {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    const t = time * .00022;
    const start = width * .28;
    const gradient = context.createLinearGradient(start, 0, width, 0);
    gradient.addColorStop(0, `rgba(${fieldColor},0)`);
    gradient.addColorStop(.5, `rgba(${fieldColor},.12)`);
    gradient.addColorStop(1, `rgba(${accentColor},.23)`);
    context.strokeStyle = gradient;
    for (let line = 0; line < 24; line++) {
      const base = height * (.12 + line * .034);
      context.beginPath();
      for (let x = start; x <= width + 16; x += 16) {
        const y = base + Math.sin(x * .006 + t + line * .21) * 33
          + Math.sin(x * .0025 - t * .65 + line * .19) * 42
          + (pointerY - .5) * 16 * x / width;
        if (x === start) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.lineWidth = line % 6 === 0 ? 1 : .6;
      context.stroke();
    }
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = rect.width; height = rect.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(lastDraw);
  }
  function animate(time) {
    if (time - lastDraw > 32) { draw(time); lastDraw = time; }
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);
    if (!isPaused() && visible && !document.hidden) frame = requestAnimationFrame(animate);
    else draw(lastDraw);
  }
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    pointerY = (event.clientY - rect.top) / rect.height;
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(hero);
  }
  window.addEventListener('themechange', () => { readPalette(); draw(lastDraw); });
  window.addEventListener('motionchange', sync);
  document.addEventListener('visibilitychange', sync);
  if ('ResizeObserver' in window) new ResizeObserver(() => { resize(); updateProgress(); }).observe(hero);
  else window.addEventListener('resize', resize);
  readPalette(); resize(); sync();
}
