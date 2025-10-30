document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('hero-search-input');
    const searchButton = document.querySelector('.hero-search-btn');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performUniversalSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performUniversalSearch();
            }
        });
    }

    function performUniversalSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            return;
        }

        let targetPage = 'index.html'; // Default to homepage or a general search results page

        // Simple keyword-based redirection
        if (query.includes('career') || query.includes('roadmap')) {
            targetPage = 'roadmap.html';
        } else if (query.includes('simulation') || query.includes('game') || query.includes('vce')) {
            targetPage = 'virtual-career-experience.html';
        } else if (query.includes('expert') || query.includes('mentor') || query.includes('professional')) {
            targetPage = 'talk-to-expert.html';
        }

        window.location.href = `${targetPage}?query=${encodeURIComponent(query)}`;
    }
});
