
const btn = document.querySelector("#fetch-btn");

btn.addEventListener("click", fetchPokemon);

async function fetchPokemon() {
    try {
        const pokemonName = document.querySelector("#pokemon-name").value.toLowerCase()
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`Failled to fetch pokemon ${pokemonName}`);
        }
        const pokemonData = await response.json();
        const pokemonSprite = pokemonData.sprites.front_default;

        const imgElement = document.querySelector("#pokemon-sprite");
        imgElement.src = pokemonSprite;
        imgElement.style.visibility = "visible";
    }
    catch (error) {
        console.error(error);
    }
}