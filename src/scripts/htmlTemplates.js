function createHtmlForPokemonSmallCard(currentPokemon, i) {
    let pokemonName = capitalizeFirstLetter(currentPokemon.name);
    let pokemonNumber = formatNumber(currentPokemon.id);
    let pokemonImage = currentPokemon.sprites.other.dream_world.front_default;
    let actualColor = setPokemonListCardsBgr(currentPokemon.types[0].type.name);
    return `
        <div class="cardSmall" style="background-color: ${actualColor}">
            <h1 class="cardName">${pokemonName}</h1>
            <div id="typContainer${i}" class="typeContainer"></div>
            <div class="cardOrder">${pokemonNumber}</div>
            <img class="cardImage" src="${pokemonImage}" alt="">
            <img class="pokeballImage" src="src/img/Unbenannt.png" alt="">
        </div>
    `;
}



function createHtmlForTypes(type) {
    return /*html*/ `
        <div class="type">${type}</div>
    `;
}
