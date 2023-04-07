let start = 1;
let endOf = 24;
let displayedPokemon = [];
let searchedPokemon = [];
let pokemonNames = [];
let allTypes = [];
let breeding = [];
let myCards = [];
let renderTypeIndex = 0;
let renderPokemonIndex = 0;


// This is the inital function what starts other functions

async function init() {
    loadCards();
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
        displayedPokemon.push(currentPokemon);
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
    for (let i = 1; i <= displayedPokemon.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`
        let response = await fetch(url);
        let breed = await response.json();
        breeding.push(breed);
    }
}

// === SMALL-CARD-FUNCTIONS ===

// This function pushes the pokemon types into an JSON array

function loadTypes() {
    for (let i = start - 1; i < displayedPokemon.length; i++) {
        const type = displayedPokemon[i].types;
        allTypes.push(type);
    }
}


function renderPokemon() {
    for (let i = renderPokemonIndex; i < displayedPokemon.length; i++) {
        const currentPokemon = displayedPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i);
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

function openFullCard(i, pokemonJson) {
    document.getElementById('fullCardContainer').style.display = 'flex';
    let card = document.getElementById('card');
    card.style = 'z-index: 3;';
    card.innerHTML = creatHtmlForFullCard(i, pokemonJson);
    addActiveClass('about');
    renderTypesForFullCard(i);
    renderSpecs(i, pokemonJson);
    renderAbilities(i, pokemonJson);
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
    for (let j = 0; j < displayedPokemon[i].moves.length; j++) {
        const move = displayedPokemon[i].moves[j].move.name;
        movesContainer.innerHTML += createHtmlForMoves(move);
    }
}


function nextCard(i, pJ) {
    openFullCard(i + 1, pJ)
}


function previousCard(i, pJ) {
    openFullCard(i - 1, pJ)
}


// === SEARCH-FUNCTIONS ===

async function searchPokemon() {
    if (document.getElementById('inputSearch').value == 0) return;
    showLoader();
    document.getElementById('cardContainer').innerHTML = '';
    searchedPokemon = [];
    await searchForPokemonInPokemonNames();
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
    for (let i = 0; i < searchedPokemon.length; i++) {
        const currentPokemon = searchedPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i, 'true');
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


// === MY-CARDS-SECTION ===

function openMyCards() {
    renderMyCards();
    switchContainer();
}


function addOrDeleteMyCards(i, pJ) {
    let card = checkIfCardIsInMyCards(pJ[i].name);
    if (card != -1) {
        document.getElementById('likeBtn').src = 'src/img/heart-empty.png';
        myCards.splice(card, 1);
        renderMyCards();
        saveCards();
        return;
    } else {
        myCards.push(pJ[i]);
        document.getElementById('likeBtn').src = 'src/img/heart-full.png';
    }
    renderMyCards();
    saveCards();
}



function checkIfCardIsInMyCards(name) {
    if (Array.isArray(myCards)) {
        for (let i = 0; i < myCards.length; i++) {
            const cardName = myCards[i].name;
            if (cardName == name) {
                return i;
            }
        }
        return -1; // das Statement wird nur ausgeführt, wenn keine Übereinstimmung gefunden wurde
    }
}




function renderMyCards() {
    let myCardContainer = document.getElementById('myCardsContainer');
    myCardContainer.innerHTML = '';
    for (let i = 0; i < myCards.length; i++) {
        const currentPokemon = myCards[i];
        console.log('Check', currentPokemon);
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