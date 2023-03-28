let start = 1;
let endOf = 25;
let allPokemon = [];
let searchedPokemon = [];
let pokemonNames = [];
let allTypes = [];
let breeding = [];
let renderTypeIndex = 0;
let renderPokemonIndex = 0;


// This is the inital function what starts other functions

async function init() {
    blurBackground();
    showLoader();
    await loadPokemon();
    await loadPokemonNames();
    loadBreeding();
    loadTypes();
    blurBackground();
    hideLoader();
    renderPokemon();
    renderTypes();
}

// === GET-API-FUNCTIONS ===

async function loadPokemon() {
    for (let i = start; i <= endOf; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
    }
}



async function loadSearchedPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    searchedPokemon.push(currentPokemon);
}



async function loadPokemonNames() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1280'
    let response = await fetch(url);
    let pokemons = await response.json();
    for (let i = 0; i < pokemons.results.length; i++) {
        const name = pokemons.results[i].name;
        pokemonNames.push(name);
    }
}



async function loadBreeding() {
    for (let i = 1; i <= allPokemon.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`
        let response = await fetch(url);
        let breed = await response.json();
        breeding.push(breed);
    }
}

// === SMALL-CARD-FUNCTIONS ===

// This function pushes the pokemon types into an JSON array

function loadTypes() {
    for (let i = start - 1; i < allPokemon.length; i++) {
        const type = allPokemon[i].types;
        allTypes.push(type);
    }
}


function renderPokemon() {
    let mainPokemonJson = 'allPokemon';
    for (let i = renderPokemonIndex; i < allPokemon.length; i++) {
        const currentPokemon = allPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i, mainPokemonJson);
        renderPokemonIndex = i + 1;
    }
}

// This function iterates through an JSON array to gets every single type

function renderTypes() {
    for (let i = renderTypeIndex; i < allTypes.length; i++) {
        const type = allTypes[i];
        for (let j = 0; j < type.length; j++) {
            const element = type[j].type.name;
            document.getElementById(`typeContainer${renderTypeIndex}`).innerHTML += createHtmlForTypes(element);
        }
        renderTypeIndex = i + 1;
    }
}

// === SINGLE-CARD-FUNCTIONS ===

function openFullCard(pj, i) {
    document.getElementById('fullCardContainer').style.display = 'flex';
    let card = document.getElementById('card');
    card.style = 'z-index: 3;';
    card.innerHTML = creatHtmlForFullCard(pj, i);
    addActiveClass('about');
    renderTypesForFullCard(i);
    renderSpecs(i);
    renderAbilities(i);
    blurBackground();
}



function renderTypesForFullCard(i) {
    let styleClass = 'typeFullCard';
    for (let index = 0; index < allTypes[i].length; index++) {
        const type = allTypes[i][index].type.name;
        document.getElementById(`fullCardTypeContainer${i}`).innerHTML += createHtmlForTypes(type, styleClass);
    }
}



function openAbout(i) {
    addActiveClass('about');
    renderSpecs(i);
    renderAbilities(i)
}



function renderSpecs(i) {
    let about = document.getElementById('infoPokemon');
    about.innerHTML = creatHtmlForAbout(i);
}


function renderAbilities(i) {
    for (let j = 0; j < allPokemon[i].abilities.length; j++) {
        const ability = allPokemon[i].abilities[j].ability.name;
        document.getElementById('abilities').innerHTML += createHtmlForAbilities(ability);
    }
    sliceKomma();
}


function openBaseStats(i) {
    addActiveClass('baseStats');
    let barContainer = document.getElementById('infoPokemon');
    barContainer.innerHTML = '';
    barContainer.innerHTML = creatHtmlForBaseStats(i);
}


function openMoves(i) {
    let infoContainer = document.getElementById('infoPokemon');
    infoContainer.innerHTML = '';
    addActiveClass('moves');
    createMoveContainer();
    renderMoves(i);
}


function createMoveContainer() {
    let infoContainer = document.getElementById('infoPokemon');
    let movesContainer = document.createElement('div');
    movesContainer.setAttribute('id', 'movesContainer');
    movesContainer.classList.add('scroll');
    infoContainer.appendChild(movesContainer);
}


function renderMoves(i) {
    let movesContainer = document.getElementById('movesContainer')
    for (let j = 0; j < allPokemon[i].moves.length; j++) {
        const move = allPokemon[i].moves[j].move.name;
        movesContainer.innerHTML += createHtmlForMoves(move);
    }
}


// === SEARCH-FUNCTIONS ===

async function searchPokemon() {
    showLoader();
    document.getElementById('cardContainer').innerHTML = '';
    searchedPokemon = [];
    await searchForPokemonInPokemonNames();
    renderSearchedPokemon();
    renderTypesSearch();
    hideLoader();
}



async function searchForPokemonInPokemonNames() {
    let searchPokemon = [];
    let search = document.getElementById('inputSearch').value;
    search = search.toLowerCase();
    for (let i = 0; i < pokemonNames.length; i++) {
        const currentPokemon = pokemonNames[i];
        if(currentPokemon.includes(search)) {
            searchPokemon.push(currentPokemon);
        }
    }
    for (let i = 0; i < searchPokemon.length; i++) {
        const onePokemon = searchPokemon[i];
        await loadSearchedPokemon(onePokemon);
    }
}



function renderSearchedPokemon() {
    let sp = 'searchedPokemon';
    for (let i = 0; i < searchedPokemon.length; i++) {
        const currentPokemon = searchedPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i, sp);
    }
}


function renderTypesSearch() {
    for (let i = 0; i < searchedPokemon.length; i++) {
        const currentPokemon = searchedPokemon[i];
        for (let j = 0; j < currentPokemon.types.length; j++) {
            const type = currentPokemon.types[j].type.name;
            document.getElementById(`typeContainer${i}`).innerHTML += createHtmlForTypes(type);
        }
    }
}