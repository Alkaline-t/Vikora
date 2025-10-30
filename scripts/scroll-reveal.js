document.addEventListener('DOMContentLoaded', () => {
    // Skip animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('no-motion');
        return;
    }

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and items with reveal classes
    const elements = document.querySelectorAll('section, .reveal-item, .reveal');
    elements.forEach((el, index) => {
        // Add a staggered delay based on position
        el.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el);
    });
});
// Simple scroll reveal using IntersectionObserver
// Scroll reveal: observe sections and reveal items with staggered entrance
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observerOpts = { threshold: 0.12 };

    const stagger = 80; // ms per item stagger

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            // Add visible/is-visible class for CSS to animate
            el.classList.add('visible');

            // Apply a small per-element stagger if multiple children inside
            if (el.dataset.revealIndex) {
                // already set by script
            }

            obs.unobserve(el);
        });
    }, observerOpts);

    // Observe all sections and any element with .reveal, .reveal-item, .fade-in
    const toObserve = Array.from(document.querySelectorAll('section, .reveal, .reveal-item, .fade-in'));

    toObserve.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 6) * stagger}ms`; // keep delays reasonable
        observer.observe(el);
    });
});
