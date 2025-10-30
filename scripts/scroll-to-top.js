document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (!scrollToTopButton) return; // nothing to do

    // Show/hide button based on scroll position
    const toggleScrollButton = () => {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
    };

    // Smooth scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Listen for scroll events
    window.addEventListener('scroll', toggleScrollButton, { passive: true });

    // Initial check for button visibility
    toggleScrollButton();
});