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



function moreCards() {
    start = start + 25;
    endOf = endOf + 25;
    // resetTypes();
    init();
}


// function resetTypes() {
//     for (let i = 0; i < allPokemon.length; i++) {
//         document.getElementById(`typeContainer${i}`).innerHTML = '';
//     }
// }



function closeCard() {
    document.getElementById('fullCardContainer').style.display = 'none';
    let card = document.getElementById('card');
    card.innerHTML = '';
    card.style = '';
    blurBackground();
}



function doNotClose(event) {
    event.stopPropagation();
}


function blurBackground() {
    let main = document.getElementById('mainSection');
    main.classList.toggle('blur');
}


function searchPokemon() {
    let search = document.getElementById('inputSearch').value;
    let cardContainer = document.getElementById('cardContainer');
    search = search.toLowerCase();
    cardContainer.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        const currentPokemon = allPokemon[i].species.name;
        const currentPokemonId = allPokemon[i].id
        if(currentPokemon.includes(search) || currentPokemonId.toString().includes(search)) {
            console.log(i, allPokemon[i]);
            cardContainer.innerHTML += createHtmlForPokemonSmallCard(allPokemon[i], i)
            renderTypesSearch(i);
        }
    }
}
