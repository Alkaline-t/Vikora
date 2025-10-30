document.addEventListener('DOMContentLoaded', () => {
  const expertSearchInput = document.getElementById('expertSearchInput');
  const expertSearchButton = document.getElementById('expertSearchButton');
  const expertCardsGrid = document.querySelector('.expert-cards-grid');
  const expertCards = document.querySelectorAll('.expert-card');
  const expertPanelHeading = document.querySelector('.expert-contact-section h2');

  function filterExpertCards() {
    const searchTerm = expertSearchInput.value.toLowerCase().trim();

    if (searchTerm) {
      expertPanelHeading.style.display = 'none'; // Hide the heading when searching
    } else {
      expertPanelHeading.style.display = ''; // Show the heading when search is empty
    }

    expertCards.forEach(card => {
      const cardTitle = card.querySelector('h3').textContent.toLowerCase();
      const cardDescription = card.querySelector('p').textContent.toLowerCase();

      if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
        card.style.display = ''; // Show the card
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  }

  // Trigger search on input change
  expertSearchInput.addEventListener('input', filterExpertCards);

  // Trigger search on button click
  expertSearchButton.addEventListener('click', filterExpertCards);

  // Check for search query in URL on page load
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('query');
  if (searchQuery) {
    expertSearchInput.value = searchQuery;
    filterExpertCards();
  }
});
