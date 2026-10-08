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
