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

function formatNumber(number) {
    let num = number;
    if (num < 10) {
        return '#00' + num;
    } else if (num < 100) {
        return '#0' + num;
    } else {
        return '#' + num;
    }
}


// This function takes an string as input and returns it with the first letter capitalized.

function capitalizeFirstLetter(lu) {
    let upCase = lu;
    return upCase.charAt(0).toUpperCase() + upCase.slice(1);
}



function sliceKomma() {
    let abilities = document.getElementById('abilities');
    let text = abilities.textContent || abilities.innerText;
    text = text.slice(0, text.length - 2);
    abilities.innerHTML = text;
}


function addActiveClass(id) {
    const elements = document.querySelectorAll('.active');
    elements.forEach((element) => {
        element.classList.remove('active');
    });
    let active = document.getElementById(id);
    active.classList.add('active');
}



function checkIndexforFullCard(myCard, i) {
    if (myCard == 'myCardTypeContainer') {
        return `openFullCard(${i}, myCards)`;
    } else if (myCard == 'true') {
        return `openFullCard(${i}, searchedPokemon)`;
    } else {
        return `openFullCard(${i}, displayedPokemon)`;
    }
}

function checkIdforTypeContainer(myCard, i) {
    if (myCard == 'myCardTypeContainer') {
        return `myCardTypeContainer${i}`;
    } else if (myCard == 'true') {
        return `typeContainer${i}`;
    } else {
        return `typeContainer${i}`;
    }
}


function checkJsonForSwitchCard(pJ) {
    if (pJ.length == displayedPokemon.length) {
        return 'displayedPokemon';
    } else if (pJ.length == myCards.length) {
        return 'myCards';
    } else {
        return 'searchedPokemon';
    }
     
}



function moreCards() {
    start = start + 24;
    endOf = endOf + 24;
    // resetTypes();
    init();
}



function closeCard() {
    document.getElementById('fullCardContainer').style.display = 'none';
    let card = document.getElementById('card');
    card.innerHTML = '';
    card.style = '';
    // blurBackground();
}



function doNotClose(event) {
    event.stopPropagation();
}


function blurBackground() {
    let main = document.getElementById('mainSection');
    main.classList.toggle('blur');
}


function checkIfthere(i) {
    if (breeding[i].egg_groups[1]) {
        return capitalizeFirstLetter(breeding[i].egg_groups[1].name);
    } else {
        return '-';
    }
}



function previousCardCheck(i) {
    if (i === 0) {
        return 'display: none';
    } else {
        return ''
    }
}



function nextCardCheck(i, pJ) {
    if (i == pJ.length - 1) {
        return 'display: none';
    } else {
        return ''
    }
}



function resetSearch() {
    resetAllJsonAndVariables();
    document.getElementById('cardContainer').innerHTML = '';
    displayedPokemon = [];
    init();
}



function resetAllJsonAndVariables() {
    start = 1;
    endOf = 24;
    allPokemon = [];
    pokemonNames = [];
    allTypes = [];
    breeding = [];
    renderTypeIndex = 0;
    renderPokemonIndex = 0;
}



function switchContainer() {
    let mainContainer = document.getElementById('cardContainer');
    let myCardContainer = document.getElementById('myCardsContainer');
    let myCardBtn = document.getElementById('favoritesBtn');
    mainContainer.classList.toggle('dNone');
    myCardContainer.classList.toggle('dNone');
    myCardBtn.classList.toggle('glowBtn');
}



function saveCards() {
    let cardsAsText = JSON.stringify(myCards);
    localStorage.setItem('cards', cardsAsText);
}


function loadCards() {
    let cardsAsText = localStorage.getItem('cards');
    if (cardsAsText) {
        myCards = JSON.parse(cardsAsText);
    }
}