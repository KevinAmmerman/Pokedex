let responeAsJson;
let allPokemon = [];


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
    let response = await fetch(url);
    responeAsJson = await response.json();
    for (let i = 0; i < responeAsJson.results.length; i++) {
        const pokemon = responeAsJson.results[i];
        let url = pokemon.url;
        let response = await fetch(url);
        allPokemon = await response.json();
        document.getElementById('cardContainer').innerHTML += renderPokemon();
    }
}

// This function takes a Pokemon object as input and returns a formatted ID string.

function formatNumber(currentPokemon) {
    let num = currentPokemon.id;
    if (num < 10) {
        return '#00' + num;
    } else if (num < 100) {
        return '#0' + num;
    } else {
        return '#' + num;
    }
}


// This function takes a Pokemon object as input and returns the name of the Pokemon with the first letter capitalized.

function capitalizeFirstLetter(currentPokemon) {
    let upCase = currentPokemon.name;
    return upCase.charAt(0).toUpperCase() + upCase.slice(1);
}