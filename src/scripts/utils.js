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


// This function that removes the last two characters from the text

function sliceKomma() {
    let abilities = document.getElementById('abilities');
    let text = abilities.textContent || abilities.innerText;
    text = text.slice(0, text.length - 2);
    abilities.innerHTML = text;
}

// This function that adds the "active" CSS class to an HTML element with the given id, while removing the "active" class from any other element that has the same class. The function is intended to be used to toggle the "active" state of multiple elements.

function addActiveClass(id) {
    const elements = document.querySelectorAll('.active');
    elements.forEach((element) => {
        element.classList.remove('active');
    });
    let active = document.getElementById(id);
    active.classList.add('active');
}

// This function checks what json array is needed and returns it

function checkIndexforFullCard(myCard, i) {
    if (myCard == 'myCardTypeContainer') {
        return `openFullCard(${i}, pokemon.myCards)`;
    } else if (myCard == 'true') {
        return `openFullCard(${i}, pokemon.searchedPokemon)`;
    } else {
        return `openFullCard(${i}, pokemon.displayedPokemon)`;
    }
}

// This function checks what id is needed for the container and returns it

function checkIdforTypeContainer(myCard, i) {
    if (myCard == 'myCardTypeContainer') {
        return `myCardTypeContainer${i}`;
    } else if (myCard == 'true') {
        return `typeContainer${i}`;
    } else {
        return `typeContainer${i}`;
    }
}

// This function checks what json array it need to use, to switch between cards

function checkJsonForSwitchCard(pJ) {
    if (pJ.length == pokemon.displayedPokemon.length) {
        return 'pokemon.displayedPokemon';
    } else if (pJ.length == pokemon.myCards.length) {
        return 'pokemon.myCards';
    } else {
        return 'pokemon.searchedPokemon';
    }    
}



function checkBreedingJson(pJ) {
    if (pJ.length == pokemon.displayedPokemon.length) {
        return pokemonBreeding.displayedPokemonBre;
    } else if (pJ.length == pokemon.myCards.length) {
        return pokemonBreeding.myCardsBre;
    } else {
        return pokemonBreeding.searchedPokemonBre;
    }  
}


function checkIfEggGroupExists(breeding, i) {
    if (breeding[i].egg_groups.length == 0) {
        return '-';
    } else {
        return capitalizeFirstLetter(breeding[i].egg_groups[0].name);
    }
}

// This function checks if the second egg_group is available, if not returns -

function checkIfthere(breeding, i) {
    if (breeding[i].egg_groups[1]) {
        return capitalizeFirstLetter(breeding[i].egg_groups[1].name);
    } else {
        return '-';
    }
}



function checkIfBaseExperienceExists(pJ, i) {
    if (pJ[i].base_experience) {
        return pJ[i].base_experience;
    } else {
        return '-';
    }
}

// This function checks if the card is already in myCard to return the source of image

function checkCardStatus(name) {
    if (Array.isArray(pokemon.myCards)) {
        for (let i = 0; i < pokemon.myCards.length; i++) {
            const cardName = pokemon.myCards[i].name;
            if (cardName === name) {
                return 'src/img/heart-full.png';
            } 
        }
        return 'src/img/heart-empty.png';
    } 
}

// This function changes the variables for the amount of loaded pokemon cards

function moreCards() {
    start = start + 24;
    endOf = endOf + 24;
    pokemonBreeding.displayedPokemonBre = [];
    init();
}

// This function to close the full card 

function closeCard() {
    document.getElementById('fullCardContainer').style.display = 'none';
    let card = document.getElementById('card');
    card.innerHTML = '';
    card.style = '';
    blurBackground();
}

// This function animates when open a single card

function animatenOpenSingleCard() {
    const box = document.querySelector('.animation');
    box.animate([
        { opacity: 0, transform: 'scale(0.5)' },
        { opacity: 1, transform: 'scale(1)' }
    ], {
        duration: 700,
        easing: 'ease',
        fill: 'forwards'
    });
}

// Function to prefent action for parrent elements

function doNotClose(event) {
    event.stopPropagation();
}

// Function to blur the background

function blurBackground() {
    let main = document.getElementById('mainSection');
    main.classList.toggle('blur');
}

// This two functions are from moving the back and forwards between cards

function nextCard(i, pJ) {
    openFullCard(i + 1, pJ)
}


function previousCard(i, pJ) {
    openFullCard(i - 1, pJ)
}

//  This two function check if there is a card before and after the current open full card and displayes or not the arrow

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

// This function checks if there is a card before or after the displayed full card, to jump to the next/last if deleted out of myCards array

function checkIndexOfJson(i, pJ) {
    if (pJ.length == 0) {
        closeCard();
        return;
    }
    if(i == 0) {
        return nextCard(i-1, pJ);
    }
    if(i <= pJ.length) {
        return previousCard(i, pJ);
    }
}

// This function resets the search field and starts the i

function resetSearch() {
    resetAllJsonAndVariables();
    document.getElementById('cardContainer').innerHTML = '';
    displayedPokemon = [];
    init();
}

// This function resets variables and arrays to default

function resetAllJsonAndVariables() {
    start = 1;
    endOf = 24;
    pokemon.searchedPokemon = [];
    pokemonBreeding.searchedPokemonBre = [];
    pokemon.displayedPokemon = [];
    pokemonBreeding.displayedPokemonBre = [];
    renderTypeIndex = 0;
    renderPokemonIndex = 0;
}

// This function toggles classes to open myCards and add a glow to the button

function switchContainer() {
    let mainContainer = document.getElementById('cardContainer');
    let myCardContainer = document.getElementById('myCardsContainer');
    let myCardBtn = document.getElementById('favoritesBtn');
    mainContainer.classList.toggle('dNone');
    myCardContainer.classList.toggle('dNone');
    myCardBtn.classList.toggle('glowBtn');
}

// This function adds the class dNone

function checkClass() {
    let card = document.getElementById('moreBtn');
    if (pokemon.searchedPokemon.length > 0) {
        card.classList.add('dNone');
    } else {
        let moreCardsBtn = document.getElementById('moreBtn');
        moreCardsBtn.classList.toggle('dNone');
    }
}


// This function checks if a certain card is already in the array of myCards

function checkIfCardIsInMyCards(name) {
    if (Array.isArray(pokemon.myCards)) {
        for (let i = 0; i < pokemon.myCards.length; i++) {
            const cardName = pokemon.myCards[i].name;
            if (cardName == name) {
                return i;
            }
        }
        return -1; 
    }
}

// This two function save and load the myCards Array in the/from the local storage

function saveCards() {
    let cardsAsText = JSON.stringify(pokemon.myCards);
    let breedingAsText = JSON.stringify(pokemonBreeding.myCardsBre);
    localStorage.setItem('cards', cardsAsText);
    localStorage.setItem('breed', breedingAsText);
}


function loadCards() {
    let cardsAsText = localStorage.getItem('cards');
    let breedingAsText = localStorage.getItem('breed');
    if (cardsAsText && breedingAsText) {
        pokemon.myCards = JSON.parse(cardsAsText);
        pokemonBreeding.myCardsBre = JSON.parse(breedingAsText);
    }
}