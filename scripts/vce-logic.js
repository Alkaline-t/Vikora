document.addEventListener('DOMContentLoaded', () => {
  const vceSearchInput = document.getElementById('vceSearchInput');
  const vceSearchButton = document.getElementById('vceSearchButton');
  const simulationCardsGrid = document.querySelector('.simulation-cards-grid');
  const simulationCards = document.querySelectorAll('.simulation-card');
  const simulationGamesHeading = document.querySelector('.simulation-games-section h2');

  function filterSimulationCards() {
    const searchTerm = vceSearchInput.value.toLowerCase().trim();

    if (searchTerm) {
      simulationGamesHeading.style.display = 'none'; // Hide the heading when searching
    } else {
      simulationGamesHeading.style.display = ''; // Show the heading when search is empty
    }

    simulationCards.forEach(card => {
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
  vceSearchInput.addEventListener('input', filterSimulationCards);

  // Trigger search on button click
  vceSearchButton.addEventListener('click', filterSimulationCards);

  // Check for search query in URL on page load
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('query');
  if (searchQuery) {
    vceSearchInput.value = searchQuery;
    filterSimulationCards();
  }
});
