let start = 1;
let endOf = 50;
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