function createHtmlForPokemonSmallCard(currentPokemon, i) {
    let pokemonName = capitalizeFirstLetter(currentPokemon.name);
    let pokemonType = currentPokemon.types[0].type.name;
    // let pokemonType2 = checkType(currentPokemon);
    let pokemonNumber = formatNumber(currentPokemon.id);
    let pokemonImage = currentPokemon.sprites.other.dream_world.front_default;
    let actualColor = setPokemonListCardsBgr(currentPokemon.types[0].type.name);
    return `
        <div class="cardSmall" style="background-color: ${actualColor}">
            <h1 class="cardName">${pokemonName}</h1>
            <div class="typ">${pokemonType}</div>
            <div class="cardOrder">${pokemonNumber}</div>
            <img class="cardImage" src="${pokemonImage}" alt="">
            <img class="pokeballImage" src="src/img/Unbenannt.png" alt="">
        </div>
    `;
}


// function checkType(currentPokemon) {
//     if (Array.isArray(currentPokemon.types[1])) {
//         return currentPokemon.types[1].type.name;
//     } else {
//         return '';
//     }
// }