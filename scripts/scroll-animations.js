document.addEventListener('DOMContentLoaded', () => {
    // Options for the intersection observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animate class
                entry.target.classList.add('animate');
                
                // Check for specific animation type
                const animationType = entry.target.dataset.animate;
                if (animationType) {
                    entry.target.classList.add(`animate-${animationType}`);
                }
                
                // Handle career cards animation
                if (entry.target.classList.contains('career-paths')) {
                    const cards = entry.target.querySelectorAll('.career-card');
                    cards.forEach((card, index) => {
                        card.style.setProperty('--card-index', index + 1);
                    });
                }
                
                // Handle resource items animation
                if (entry.target.classList.contains('resources')) {
                    const items = entry.target.querySelectorAll('.resource-item');
                    items.forEach((item, index) => {
                        item.style.setProperty('--item-index', index + 1);
                    });
                }

                if (entry.intersectionRatio > 0.5) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, options);

    // Observe career paths section
    const careerPaths = document.querySelector('.career-paths');
    if (careerPaths) {
        observer.observe(careerPaths);
    }

    // Observe resources section
    const resources = document.querySelector('.resources');
    if (resources) {
        observer.observe(resources);

        // Add mouse movement effect to individual cards
        const cards = careerPaths.querySelectorAll('.career-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                const rotateX = deltaY * -10;
                const rotateY = deltaX * 10;
                
                card.style.transform = `
                    perspective(1000px)
                    scale3d(1.05, 1.05, 1.05)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `
                    perspective(1000px)
                    scale3d(1, 1, 1)
                    rotateX(0deg)
                    rotateY(0deg)
                `;
            });
        });
    }
});