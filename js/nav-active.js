(() => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-pill').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const target = href.split('/').pop();
    if (target && target === path) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
