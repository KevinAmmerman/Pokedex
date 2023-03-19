let start = 1;
let endOf = 100;
let allPokemon = [];
let allTypes = [];


// This is the inital function what starts other functions

async function init() {
    showLoader()
    await loadPokemon(),
    loadTypes()
    hideLoader();
    renderPokemon();
    renderTypes();
}


function showLoader() {
    const loader = document.getElementById("loadingContainer");
    loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("loadingContainer");
    loader.style.display = "none";
}


// This function loads a certain amount of pokemon and pushes it into an JSON Array

async function loadPokemon() {
    for (let i = start; i <= endOf; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
    }
}


// This function pushes the pokemon types into an JSON array

function loadTypes() {
    for (let i = 0; i < allPokemon.length; i++) {
        const type = allPokemon[i].types;
        allTypes.push(type);
    }
}


// This function iterates through an JSON array to gets every single type

function renderTypes() {
    for (let i = 0; i < allTypes.length; i++) {
        const type = allTypes[i];
        for (let j = 0; j < type.length; j++) {
            const element = type[j].type.name;
            // console.log('test', element);
            document.getElementById(`typContainer${i}`).innerHTML += createHtmlForTypes(element);
        }
    }
}


// This function iterates through all pokemons to get one and renders it

function renderPokemon() {
    for (let i = 0; i < allPokemon.length; i++) {
        const currentPokemon = allPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i);
    }
}


// This function gives based on the type of Pokemon an color code back for the background

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


// window.addEventListener("load", function() {
//     const loader = document.getElementById("loadingContainer");
//     loader.style.display = "none";
//   });