function createHtmlForPokemonSmallCard(currentPokemon, i) {
    let pokemonName = capitalizeFirstLetter(currentPokemon.name);
    let pokemonNumber = formatNumber(currentPokemon.id);
    let pokemonImage = currentPokemon.sprites.other.dream_world.front_default;
    let actualColor = setPokemonListCardsBgr(currentPokemon.types[0].type.name);
    return `
        <div onclick="openFullCard(${i})" class="cardSmall" style="background-color: ${actualColor}">
            <h1 class="cardName">${pokemonName}</h1>
            <div id="typeContainer${i}" class="typeContainer"></div>
            <div class="cardOrder">${pokemonNumber}</div>
            <img class="pokeballImage" src="src/img/Unbenannt.png" alt="">
            <img class="cardImage" src="${pokemonImage}" alt="">
            
        </div>
    `;
}



function createHtmlForTypes(type, cl) {
    let upCaseType = capitalizeFirstLetter(type);
    return /*html*/ `
        <div class="type ${cl}">${upCaseType}</div>
    `;
}


function creatHtmlForFullCard(i) {
    let pokemonName = capitalizeFirstLetter(allPokemon[i].name);
    let pokemonNumber = formatNumber(allPokemon[i].id);
    let pokemonImage = allPokemon[i].sprites.other.dream_world.front_default;
    let actualColor = setPokemonListCardsBgr(allPokemon[i].types[0].type.name);
    return /*html*/ `
        <div class="topPart" style="background-color: ${actualColor};">
            <img class="likeBtn" src="src/img/heart-empty.png" alt="">
            <img onclick="closeCard()" class="closeBtn" src="src/img/close.png" alt="">
            <h1 class="fullCardName">${pokemonName}</h1>
            <div id="fullCardTypeContainer${i}" class="fullCardTypeContainer">
                
            </div>
            <div class="fullCardOrder">${pokemonNumber}</div>
        </div>
        <img class="fullCardImage" src="${pokemonImage}"></img>
        <img class="fullCardPokeballImage" src="src/img/Unbenannt.png" alt="">
        <div class="bottomPart">
            <div class="statsNav">
                <div class="stats">About</div>
                <div class="stats">Base Stats</div>
                <div class="stats">Moves</div>
            </div>
            <div class="border"></div>
            <div id="infoPokemon"></div>
        </div>
    `;
}


function creatHtmlForAbout(i) {
    let height = allPokemon[i].height * 10;
    let weight = allPokemon[i].weight / 10;
    let bs = allPokemon[i].base_experience;
    return /*html*/ `
        <div class="about">
            <div class="aboutRow">
                <div class="specs">Height</div>
                <p>${height}cm</p>
            </div>
            <div class="aboutRow">
                <div class="specs">Weight</div>
                <p>${weight}kg</p>
            </div>
            <div class="aboutRow">
                <div class="specs">Abilities</div>
                <div id="abilities"></div>
            </div>
            <div class="aboutRow">
                <div class="specs">Base Experience</div>
                <p>${bs}</p>
            </div>
        </div>
    `;
}


function createHtmlForAbilities(ability) {
    let abilityUpCase = capitalizeFirstLetter(ability);
    return `${abilityUpCase}, `;
}