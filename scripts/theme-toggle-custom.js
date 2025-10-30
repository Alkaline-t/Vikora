// Custom theme toggle: toggles between 'dark' and 'light' by setting [data-theme] on <html>
// Persists selection in localStorage under 'siteTheme'. Works indefinitely (toggle as many times as desired).
(function(){
  const KEY = 'siteTheme';
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeToggleIcon');

  function applyTheme(theme){
    if(!theme) return;
    document.documentElement.setAttribute('data-theme', theme);
    document.body && document.body.setAttribute('data-theme', theme);
    if(btn) btn.setAttribute('aria-pressed', theme === 'dark');
    if(icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  function getStored(){
    try{ return localStorage.getItem(KEY); }catch(e){return null}
  }
  function store(t){
    try{ localStorage.setItem(KEY, t); }catch(e){}
  }

  function init(){
    // prefer stored value, otherwise try system preference
    let theme = getStored();
    if(!theme){
      try{
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
      }catch(e){ theme = 'dark'; }
    }
    applyTheme(theme);

    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store(next);
    });
  }

  // initialize after DOM is ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  // expose small API
  window.siteTheme = {
    get: ()=>document.documentElement.getAttribute('data-theme'),
    set: (t)=>{ applyTheme(t); store(t); }
  };
})();
