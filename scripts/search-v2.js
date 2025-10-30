// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchForm = document.querySelector('.hero-search');
    const searchInput = document.querySelector('#hero-search-input');
    const searchResults = document.querySelector('#search-results');
    const searchButton = document.querySelector('.hero-search-btn');
    
    // Store all searchable content
    let searchableContent = [];

    // Collect all website content initially
    function initializeSearch() {
        // Index only clear topic/title elements to avoid duplicate/long content entries.
        // We'll collect:
        // - h1, h2, h3 headings
        // - elements with a data-card-title attribute (cards)
        // This keeps the search focused on topic names only.
        const titleSelectors = 'h1, h2, h3, [data-card-title], .card.clickable-card';

        const nodes = Array.from(document.querySelectorAll(titleSelectors));
        const seen = new Set();
        let autoId = 1;

        nodes.forEach(node => {
            // Skip search form and nav headings
            if (node.closest('.hero-search') || node.closest('nav')) return;

            let title = '';
            if (node.hasAttribute && node.hasAttribute('data-card-title')) {
                title = node.getAttribute('data-card-title') || '';
            }

            // If node is a heading, use its text
            if (!title) {
                const tag = node.tagName && node.tagName.toLowerCase();
                if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
                    title = node.textContent.trim();
                } else if (node.classList && node.classList.contains('card') && node.dataset && node.dataset.cardTitle) {
                    title = node.dataset.cardTitle.trim();
                }
            }

            if (!title) return;

            // Normalize title for deduplication
            const key = title.replace(/\s+/g, ' ').trim().toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);

            // Ensure the element has an id so click-to-scroll works
            let id = node.id;
            if (!id) {
                id = 'search-item-' + (autoId++);
                try { node.id = id; } catch (e) { /* ignore */ }
            }

            searchableContent.push({ title: title, id: id, element: node });
        });

        console.log('Indexed', searchableContent.length, 'topic items for search');
    }

    // Detach the results element to the body so it won't be clipped by hero or other stacking contexts
    (function detachResults() {
        if (!searchResults) return;
        try {
            document.body.appendChild(searchResults);
            searchResults.style.position = 'fixed';
            searchResults.style.zIndex = '100000';
            searchResults.style.display = 'none';
        } catch (err) {
            console.warn('Failed to move search results to body', err);
        }
    })();

    // Position the floating results directly under the input using viewport coordinates
    function positionResults() {
        if (!searchResults || !searchInput) return;
        const rect = searchInput.getBoundingClientRect();
        const top = Math.round(rect.bottom + 8);
        const left = Math.round(rect.left);
        const width = Math.round(rect.width);

        searchResults.style.top = top + 'px';
        searchResults.style.left = left + 'px';
        searchResults.style.width = width + 'px';
        searchResults.style.maxWidth = Math.min(width, window.innerWidth - 24) + 'px';
    }

    // Move the results element to the document body so it's not clipped
    // by parent stacking contexts (hero background, transforms, etc.).
    // We'll position it using viewport coordinates so it's always on top.
    function performSearch(query) {
        query = (query || '').toLowerCase().trim();

        // Require at least 2 characters to avoid showing results for single-letter typing
        if (!query || query.length < 2) {
            if (searchResults) searchResults.style.display = 'none';
            return;
        }

        // Match only against topic titles (not large content) to avoid noisy matches
        const matches = searchableContent.filter(item => item.title.toLowerCase().includes(query));

        // Display only the topic/title (no long snippet) and avoid duplicates
        if (matches.length > 0) {
            const resultsHTML = matches.map(match => {
                return `
                    <div class="search-result" data-id="${match.id}">
                        <h3>${match.title}</h3>
                    </div>
                `;
            }).join('');

            searchResults.innerHTML = resultsHTML;
        } else {
            searchResults.innerHTML = `
                <div class="search-empty">
                    No results found for "${query}"
                </div>
            `;
        }

        // Position before showing so it appears under the input and above backgrounds
        positionResults();
        searchResults.style.display = 'block';
    }

    // Event listeners
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('input', () => {
        performSearch(searchInput.value);
    });

    // Click handling for results
    searchResults.addEventListener('click', (e) => {
        const result = e.target.closest('.search-result');
        if (result) {
            const id = result.dataset.id;
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    searchResults.style.display = 'none';
                }
            }
        }
    });

    // Close results when clicking outside (consider the detached results)
    document.addEventListener('click', (e) => {
        const target = e.target;
        const clickedInsideForm = searchForm && searchForm.contains(target);
        const clickedInsideResults = searchResults && searchResults.contains(target);
        if (!clickedInsideForm && !clickedInsideResults) {
            if (searchResults) searchResults.style.display = 'none';
        }
    });

    // Re-position results on scroll and resize so they stay aligned with input
    window.addEventListener('resize', positionResults);
    window.addEventListener('scroll', positionResults, { passive: true });

    // Initialize search
    initializeSearch();
});