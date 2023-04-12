let start = 1;
let endOf = 24;
let pokemonNames = [];
let pokemon = {
    displayedPokemon: [],
    searchedPokemon: [],
    myCards: []
};
let pokemonBreeding = {
    displayedPokemonBre: [],
    searchedPokemonBre: [],
    myCardsBre: [],
};
let renderTypeIndex = 0;
let renderPokemonIndex = 0;


// This is the inital function what starts other functions

async function init() {
    loadCards();
    blurBackground();
    showLoader();
    await loadPokemon();
    await loadPokemonNames();
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
        pokemon.displayedPokemon.push(currentPokemon);
        loadBreeding('displayedPokemonBre', i);
    }
}



async function loadSearchedPokemon(i, j) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    pokemon.searchedPokemon.push(currentPokemon);
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



async function loadBreeding(pjb, i) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`
    let response = await fetch(url);
    let breed = await response.json();
    pokemonBreeding[pjb].push(breed);
    saveCards();
}

// === SMALL-CARD-FUNCTIONS ===


function renderPokemon() {
    for (let i = renderPokemonIndex; i < pokemon.displayedPokemon.length; i++) {
        const currentPokemon = pokemon.displayedPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i);
        renderPokemonIndex = i + 1;
    }
}

// This function iterates through an JSON array to gets every single type

function renderTypes() {
    for (let i = renderTypeIndex; i < pokemon.displayedPokemon.length; i++) {
        const types = pokemon.displayedPokemon[i].types;
        for (let t = 0; t < types.length; t++) {
            const type = types[t].type.name;
            document.getElementById(`typeContainer${renderTypeIndex}`).innerHTML += createHtmlForTypes(type);
        }
        renderTypeIndex = i + 1;
    }
}

// === SINGLE-CARD-FUNCTIONS ===

function openFullCard(i, pokemonJson) {
    document.getElementById('fullCardContainer').style.display = 'flex';
    let card = document.getElementById('card');
    card.style = 'z-index: 3;';
    card.innerHTML = creatHtmlForFullCard(i, pokemonJson);
    addActiveClass('about');
    renderTypesForFullCard(i, pokemonJson);
    renderSpecs(i, pokemonJson);
    renderAbilities(i, pokemonJson);
    if (document.getElementById('mainSection').classList.contains('blur')) return;
    blurBackground();
}



function renderTypesForFullCard(i, pJ) {
    let styleClass = 'typeFullCard';
    for (let t = 0; t < pJ[i].types.length; t++) {
        const type = pJ[i].types[t].type.name;
        document.getElementById(`fullCardTypeContainer${i}`).innerHTML += createHtmlForTypes(type, styleClass);
    }
}



function openAbout(i, pJ) {
    addActiveClass('about');
    renderSpecs(i, pJ);
    renderAbilities(i, pJ)
}



function renderSpecs(i, pJ) {
    let about = document.getElementById('infoPokemon');
    about.innerHTML = creatHtmlForAbout(i, pJ);
}


function renderAbilities(i, pJ) {
    for (let j = 0; j < pJ[i].abilities.length; j++) {
        const ability = pJ[i].abilities[j].ability.name;
        document.getElementById('abilities').innerHTML += createHtmlForAbilities(ability);
    }
    sliceKomma();
}


function openBaseStats(i, pJ) {
    addActiveClass('baseStats');
    let barContainer = document.getElementById('infoPokemon');
    barContainer.innerHTML = '';
    barContainer.innerHTML = creatHtmlForBaseStats(i, pJ);
}


function openMoves(i, pJ) {
    let infoContainer = document.getElementById('infoPokemon');
    infoContainer.innerHTML = '';
    addActiveClass('moves');
    createMoveContainer();
    renderMoves(i, pJ);
}


function createMoveContainer() {
    let infoContainer = document.getElementById('infoPokemon');
    let movesContainer = document.createElement('div');
    movesContainer.setAttribute('id', 'movesContainer');
    movesContainer.classList.add('scroll');
    infoContainer.appendChild(movesContainer);
}


function renderMoves(i, pJ) {
    let movesContainer = document.getElementById('movesContainer')
    for (let j = 0; j < pJ[i].moves.length; j++) {
        const move = pJ[i].moves[j].move.name;
        movesContainer.innerHTML += createHtmlForMoves(move);
    }
}


// === SEARCH-FUNCTIONS ===

async function searchPokemon() {
    resetAllJsonAndVariables();
    if (document.getElementById('inputSearch').value == 0) return;
    showLoader();
    document.getElementById('cardContainer').innerHTML = '';
    pokemon.searchedPokemon = [];
    await searchForPokemonInPokemonNames();
    checkForSpecies();
    renderSearchedPokemon();
    renderTypesSearch();
    hideLoader();
}



async function searchForPokemonInPokemonNames() {
    let searchedPokemon = [];
    let search = document.getElementById('inputSearch');
    searchValue = search.value.toLowerCase();
    for (let i = 0; i < pokemonNames.length; i++) {
        const currentPokemon = pokemonNames[i];
        if (currentPokemon.includes(searchValue)) {
            searchedPokemon.push(currentPokemon);
        }
    }
    for (let i = 0; i < searchedPokemon.length; i++) {
        const onePokemon = searchedPokemon[i];
        await loadSearchedPokemon(onePokemon);
    }
    search.value = '';
}



function renderSearchedPokemon() {
    for (let i = 0; i < pokemon.searchedPokemon.length; i++) {
        const currentPokemon = pokemon.searchedPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i, 'true');
    }
}


function renderTypesSearch() {
    for (let i = 0; i < pokemon.searchedPokemon.length; i++) {
        const currentPokemon = pokemon.searchedPokemon[i];
        for (let j = 0; j < currentPokemon.types.length; j++) {
            const type = currentPokemon.types[j].type.name;
            document.getElementById(`typeContainer${i}`).innerHTML += createHtmlForTypes(type);
        }
    }
}


// === MY-CARDS-SECTION ===

function openMyCards() {
    renderMyCards();
    switchContainer();
}


function addOrDeleteMyCards(i, pJ) {
    let card = checkIfCardIsInMyCards(pJ[i].name);
    if (card != -1) {
        document.getElementById('likeBtn').src = 'src/img/heart-empty.png';
        pokemon.myCards.splice(card, 1);
        pokemonBreeding.myCardsBre.splice(card, 1);
        renderMyCards();
        saveCards();
        checkIndexOfJson(i, pJ);
        return;
    } else {
        pokemon.myCards.push(pJ[i]);
        document.getElementById('likeBtn').src = 'src/img/heart-full.png';
    }
    checkNumberOfPokemonForBreeding(i, pJ);
    renderMyCards();
    saveCards();
}


function checkNumberOfPokemonForBreeding(i, pJ) {
    let currentPokemon = pJ[i].name;
    for (let i = 0; i < pokemonNames.length; i++) {
        const listName = pokemonNames[i];
        if (currentPokemon == listName) {
            loadBreeding('myCardsBre', i + 1);
        }
    }
}



function renderMyCards() {
    let myCardContainer = document.getElementById('myCardsContainer');
    myCardContainer.innerHTML = '';
    for (let i = 0; i < pokemon.myCards.length; i++) {
        const currentPokemon = pokemon.myCards[i];
        document.getElementById('myCardsContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i, 'myCardTypeContainer');
        renderTypesMyCards(currentPokemon, i);
    }
}


function renderTypesMyCards(currentPokemon, j) {
    for (let i = 0; i < currentPokemon.types.length; i++) {
        const type = currentPokemon.types[i].type.name;
        document.getElementById(`myCardTypeContainer${j}`).innerHTML += createHtmlForTypes(type);
    }
}