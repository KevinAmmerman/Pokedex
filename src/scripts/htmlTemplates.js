function renderPokemon() {
    return `
        <div class="pokemonCardSmall">
            <h1 class="pokeName">${capitalizeFirstLetter(allPokemon)}</h1>
            <div class="typ">${allPokemon.types[0].type.name}</div>
            <div class="orderPokemon">${formatNumber(allPokemon)}</div>
            <img class="pokeImage" src="${allPokemon.sprites.other.dream_world.front_default}" alt="">
            <img class="pokeballImage" src="src/img/Unbenannt.png" alt="">
        </div>
    `;
}