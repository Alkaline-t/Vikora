// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Search script initializing...');
    
    // Get search elements
    const searchForm = document.querySelector('.hero-search');
    const searchInput = document.querySelector('#hero-search-input');
    const searchResults = document.querySelector('#search-results');
    const searchButton = document.querySelector('.hero-search-btn');
    
    // Store all searchable content
    let searchableContent = [];
    
    // Function to collect all website content
    function collectContent() {
        console.log('Collecting website content...');
        
        // Get all text-containing elements
        const contentElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, .card, .panel, section, article, .mission-card, .vision-card, .impact-card');
        
        contentElements.forEach(element => {
            // Skip navigation and search elements
            if (element.closest('nav') || element.closest('.search-results')) {
                return;
            }

            // Get the text content
            const text = element.textContent.trim();
            if (text.length > 0) {
                // Find the closest heading or title
                const heading = element.querySelector('h1, h2, h3, h4, h5, h6') || 
                              element.closest('section, article')?.querySelector('h1, h2, h3, h4, h5, h6');
                
                const title = heading ? heading.textContent : 
                            (element.tagName.match(/H[1-6]/) ? element.textContent : '');

                // Get the element's section or meaningful parent
                const section = element.closest('section, article, .card, .panel');
                const sectionId = section?.id || '';

                searchableContent.push({
                    title: title,
                    content: text,
                    element: element,
                    sectionId: sectionId,
                    type: element.tagName.toLowerCase()
                });
            }
        });

        console.log('Collected', searchableContent.length, 'searchable items');
    }
    
    // Function to build comprehensive search index
    function buildSearchIndex() {
        // Index all major content containers
        const contentElements = document.querySelectorAll(
            'section, .card, .detail-card, article, .mission-card, .vision-card, ' +
            '.impact-card, .community-card, .feature-card, .content-block, ' +
            '.about-section, .support-section, .stories-section, p, .panel'
        );
        
        contentElements.forEach(element => {
            // Get heading or title
            const title = element.querySelector('h1, h2, h3, h4, .card-title, .title')?.textContent || '';
            
            // Get full text content including nested elements
            const fullText = extractText(element);
            
            // Get element ID or generate one if needed
            let id = element.id;
            if (!id && title) {
                id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                element.id = id;
            }
            
            // Get any keywords or tags
            const keywords = element.dataset.keywords || '';
            
            // Create search item with comprehensive data
            if (fullText.length > 0) {
                searchIndex.push({
                    title: title,
                    content: fullText,
                    keywords: keywords,
                    id: id || '',
                    element: element,
                    type: element.tagName.toLowerCase(),
                    classes: Array.from(element.classList).join(' ')
                });
            }
        });
        
        console.log('Search index built with', searchIndex.length, 'content items');
    }
    
    // Build the initial search index
    buildSearchIndex();

    // Function to perform search
    function performSearch(query) {
        console.log('Performing search for:', query);
        query = query.toLowerCase().trim();
        
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = searchableContent.filter(item => {
            const contentMatch = item.content.toLowerCase().includes(query);
            const titleMatch = item.title.toLowerCase().includes(query);
            return contentMatch || titleMatch;
        });

        console.log('Found', matches.length, 'matches');

        if (matches.length > 0) {
            const resultsHTML = matches.map(match => {
                let displayTitle = match.title || 'Found in: ' + match.type;
                let snippet = match.content;

                // Create a snippet around the matching text
                const matchIndex = snippet.toLowerCase().indexOf(query);
                if (matchIndex !== -1) {
                    const start = Math.max(0, matchIndex - 50);
                    const end = Math.min(snippet.length, matchIndex + query.length + 100);
                    snippet = (start > 0 ? '...' : '') +
                             snippet.substring(start, end) +
                             (end < snippet.length ? '...' : '');
                } else {
                    snippet = snippet.substring(0, 150) + '...';
                }

                // Highlight the matching text
                const highlightedSnippet = snippet.replace(
                    new RegExp(query, 'gi'),
                    match => `<mark>${match}</mark>`
                );

                return `
                    <div class="search-result" data-section="${match.sectionId}">
                        <h3>${displayTitle}</h3>
                        <p>${highlightedSnippet}</p>
                        <span class="result-type">${match.type}</span>
                    </div>
                `;
            }).join('');

            searchResults.innerHTML = resultsHTML;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = `
                <div class="search-empty">
                    No results found for "${query}"
                </div>
            `;
            searchResults.style.display = 'block';
        }
            let titleMatches = 0;
            let contentMatches = 0;
            let keywordMatches = 0;
            
            // Check each query word
            queryWords.forEach(word => {
                // Title matches (highest weight)
                if (item.title.toLowerCase().includes(word)) {
                    score += 10;
                    titleMatches++;
                }
                
                // Keyword matches (high weight)
                if (item.keywords.toLowerCase().includes(word)) {
                    score += 8;
                    keywordMatches++;
                }
                
                // Content matches (normal weight)
                if (item.content.toLowerCase().includes(word)) {
                    score += 5;
                    contentMatches++;
                }
            });
            
            return {
                ...item,
                score,
                titleMatches,
                contentMatches,
                keywordMatches
            };
        }).filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score);

        // Display results with enhanced snippets
        if (matches.length > 0) {
            const resultsHTML = matches.map(match => {
                // Find the best snippet that includes the query terms
                let bestSnippet = '';
                let lowestIndex = Infinity;
                
                queryWords.forEach(word => {
                    const index = match.content.toLowerCase().indexOf(word);
                    if (index !== -1 && index < lowestIndex) {
                        lowestIndex = index;
                        // Create snippet with context around the match
                        const start = Math.max(0, index - 60);
                        const end = Math.min(match.content.length, index + 100);
                        bestSnippet = '...' + match.content.substring(start, end) + '...';
                    }
                });
                
                // If no good snippet found, use the start of the content
                if (!bestSnippet) {
                    bestSnippet = match.content.substring(0, 160) + '...';
                }

                // Highlight matching words in the snippet
                queryWords.forEach(word => {
                    const regex = new RegExp(word, 'gi');
                    bestSnippet = bestSnippet.replace(regex, match => `<mark>${match}</mark>`);
                });

                return `
                    <div class="search-result" data-id="${match.id}">
                        <h3>${match.title || 'Matching content found'}</h3>
                        <p>${bestSnippet}</p>
                        ${match.type ? `<span class="result-type">${match.type}</span>` : ''}
                    </div>
                `;
            }).join('');

            searchResults.innerHTML = resultsHTML;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = `
                <div class="search-empty">
                    No results found for "${query}"
                </div>
            `;
            searchResults.style.display = 'block';
        }
    }

    // Event Listeners
    
    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    // Handle input changes for live search
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(searchInput.value);
        }, 300);
    });

    // Handle clicking on search results
    searchResults.addEventListener('click', (e) => {
        const resultItem = e.target.closest('.search-result');
        if (resultItem) {
            const id = resultItem.dataset.id;
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    searchResults.style.display = 'none';
                }
            }
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target) && !searchResultsContainer.contains(e.target)) {
            searchResultsContainer.style.display = 'none';
        }
    });

    // Handle theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                searchResultsContainer.style.background = getComputedStyle(document.body)
                    .getPropertyValue('--bg-color');
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });