let start = 1;
let endOf = 10;
let allPokemon = [];
let allTypes = [];
let breeding = [];
let renderTypeIndex = 0;
let renderPokemonIndex = 0;


// This is the inital function what starts other functions

async function init() {
    showLoader()
    await loadPokemon();
    loadTypes();
    loadBreeding();
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
    for (let i = start - 1; i < allPokemon.length; i++) {
        const type = allPokemon[i].types;
        allTypes.push(type);
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


// This function iterates through all pokemons to get one and renders it

function renderPokemon() {
    for (let i = renderPokemonIndex; i < allPokemon.length; i++) {
        const currentPokemon = allPokemon[i];
        document.getElementById('cardContainer').innerHTML += createHtmlForPokemonSmallCard(currentPokemon, i);
        renderPokemonIndex = i + 1;
    }
}



function openFullCard(i) {
    document.getElementById('fullCardContainer').style.display = 'flex';
    let card = document.getElementById('card');
    card.style = 'z-index: 3;';
    card.innerHTML = creatHtmlForFullCard(i);
    addActiveClass('about');
    renderTypesForFullCard(i);
    renderSpecs(i);
    renderAbilities(i);
    blurBackground();
}


function openAbout(i) {
    addActiveClass('about');
    renderSpecs(i);
    renderAbilities(i)
}



function renderTypesForFullCard(i) {
    let styleClass = 'typeFullCard';
    for (let index = 0; index < allTypes[i].length; index++) {
        const type = allTypes[i][index].type.name;
        document.getElementById(`fullCardTypeContainer${i}`).innerHTML += createHtmlForTypes(type, styleClass);
    }
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