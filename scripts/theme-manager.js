// Theme Manager
// Force dark theme only
document.addEventListener('DOMContentLoaded', () => {
    // Respect stored user preference or system preference. Do not force dark.
    try {
        const stored = localStorage.getItem('siteTheme');
        let theme = stored;
        if (!theme) {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
        document.body && document.body.setAttribute('data-theme', theme);
        window.themeManager = {
            isDark: theme === 'dark',
            setTheme: (t) => {
                document.documentElement.setAttribute('data-theme', t);
                document.body && document.body.setAttribute('data-theme', t);
                try { localStorage.setItem('siteTheme', t); } catch (e) {}
                window.themeManager.isDark = (t === 'dark');
            },
            toggleTheme: () => {
                const next = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
                window.themeManager.setTheme(next);
            }
        };
    } catch (e) {
        // fallback to dark if anything goes wrong
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});