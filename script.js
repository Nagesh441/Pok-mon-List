const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const limit = 20;

const pokemonListElem = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('load-more');

// Function to fetch a list of Pokémon
async function fetchPokemonList(offset, limit) {
  const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results;
}

// Function to fetch details of a specific Pokémon
async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to display Pokémon cards
function displayPokemonList(pokemonList) {
  pokemonListElem.innerHTML = '';
  pokemonList.forEach(pokemon => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.textContent = pokemon.name;
    pokemonCard.addEventListener('click', async () => {
      const pokemonDetails = await fetchPokemonDetails(pokemon.url);
      showPokemonDetails(pokemonDetails);
    });
    pokemonListElem.appendChild(pokemonCard);
  });
}

// Function to show Pokémon details
function showPokemonDetails(pokemon) {
  const pokemonDetailsElem = document.getElementById('pokemon-details');
  pokemonDetailsElem.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
  `;
}

// Event listener for Load More button
loadMoreButton.addEventListener('click', async () => {
  offset += limit;
  const newPokemonList = await fetchPokemonList(offset, limit);
  displayPokemonList(newPokemonList);
});

// Initial load of Pokémon
fetchPokemonList(offset, limit).then(displayPokemonList);
