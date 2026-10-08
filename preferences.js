// Apply the saved theme before styles load to avoid a flash of the wrong palette.
(() => {
  let theme = 'dark';
  let language = 'en';
  try {
    if (localStorage.getItem('nolan-theme') === 'light') theme = 'light';
    if (localStorage.getItem('nolan-language') === 'zh') language = 'zh';
  } catch { /* The page remains usable when browser storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
  window.sitePreferences = { theme, language };
})();
