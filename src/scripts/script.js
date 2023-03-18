let start = 1;
let endOf = 50;

let allPokemon = [];


async function init() {
    await loadPokemon();
    renderPokemon();
}

async function loadPokemon() {
    for (let i = start; i <= endOf; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
    }
}


function renderPokemon() {
    for (let i = 0; i < allPokemon.length; i++) {
        const currentPokemon = allPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i);
    }
}


function setPokemonListCardsBgr(element) {
    return (
        {
            fire: "#E53B18",
            grass: "#59A952",
            water: "#278BCC",
            poison: "#864AB8",
            flying: "#87B5E5",
            normal: "#A8A899",
            bug: "#83AD25",
            dark: "#463D3E",
            dragon: "#4D64AB",
            electric: "#E5C600",
            fairy: "#FFBBF9",
            fighting: "#D580CF",
            ghost: "#633C64",
            ground: "#966833",
            ice: "#68BAAC",
            psychic: "#E55973",
            rock: "#A8995B",
            steel: "#9999A8",
        }[element.toLowerCase()] || "#5D9081"
    );
}


// This function takes a Pokemon object as input and returns a formatted ID string.

function formatNumber(currentPokemon) {
    let num = currentPokemon;
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
    let upCase = currentPokemon;
    return upCase.charAt(0).toUpperCase() + upCase.slice(1);
}