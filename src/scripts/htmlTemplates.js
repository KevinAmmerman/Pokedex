function createHtmlForPokemonSmallCard(currentPokemon, i) {
    let pokemonName = capitalizeFirstLetter(currentPokemon.name);
    let pokemonNumber = formatNumber(currentPokemon.id);
    let pokemonImage = currentPokemon.sprites.other['official-artwork'].front_default;
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
    let pokemonImage = allPokemon[i].sprites.other['official-artwork'].front_default;
    let previousCardArrow = previousCardCheck(i);
    let nextCardArrow = nextCardCheck(i);
    let actualColor = setPokemonListCardsBgr(allPokemon[i].types[0].type.name);
    let cardStatus = checkCardStatus(i);
    return /*html*/ `
        <div class="topPart" style="background-color: ${actualColor};">
            <img onclick="addOrDeleteMyCards(${i})" class="likeBtn" id="likeBtn" src="${cardStatus}" alt="">
            <img onclick="closeCard()" class="closeBtn" src="src/img/close.png" alt="">
            <h1 class="fullCardName">${pokemonName}</h1>
            <div id="fullCardTypeContainer${i}" class="fullCardTypeContainer">
                
            </div>
            <div class="fullCardOrder">${pokemonNumber}</div>
        </div>
        <img class="fullCardImage" src="${pokemonImage}"></img>
        <img class="fullCardPokeballImage" src="src/img/Unbenannt.png" alt="">
        <div class="bottomPart">
            <div class="arrowContainer">
                <img style="${previousCardArrow}" onclick="previousCard(${i})" class="leftArrowStyle" src="src/img/left.png" alt="">
                <img style="${nextCardArrow}" onclick="nextCard(${i})" class="rightArrowStyle" src="src/img/right.png" alt="">
            </div>
            <div class="statsNav">
                <div id="about" class="stats" onclick="openAbout(${i})">About</div>
                <div id="baseStats" class="stats" onclick="openBaseStats(${i})">Base Stats</div>
                <div id="moves" class="stats" onclick="openMoves(${i})">Moves</div>
            </div>
            <div class="border"></div>
            <div id="infoPokemon">
                <div id="movesContainer"></div>
            </div>
        </div>
    `;
}


function checkCardStatus(i) {
    if (myCards.includes(i)) {
        return 'src/img/heart-full.png';
    } else {
        return 'src/img/heart-empty.png';
    }
}



function creatHtmlForAbout(i) {
    let height = allPokemon[i].height * 10;
    let weight = allPokemon[i].weight / 10;
    let bs = allPokemon[i].base_experience;
    let eg = capitalizeFirstLetter(breeding[i].egg_groups[0].name);
    let ec = checkIfthere(i);
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
                <div class="specs">Base Exp.</div>
                <p>${bs}</p>
            </div>
            <div class="aboutRow">
                <h1>Breeding</h1>
            </div>
            <div class="aboutRow">
                <div class="specs">Egg Groups</div>
                <p>${eg}</p>
            </div>
            <div class="aboutRow">
                <div class="specs">Egg Cycle</div>
                <p>${ec}</p>
            </div>
        </div>
    `;
}



function createHtmlForAbilities(ability) {
    let abilityUpCase = capitalizeFirstLetter(ability);
    return `${abilityUpCase}, `;
}



function creatHtmlForBaseStats(i) {
    let hp = allPokemon[i].stats[0].base_stat;
    let attack = allPokemon[i].stats[1].base_stat;
    let defense = allPokemon[i].stats[2].base_stat;
    let sa = allPokemon[i].stats[3].base_stat;
    let sd = allPokemon[i].stats[4].base_stat;
    let speed = allPokemon[i].stats[5].base_stat;
    return /*html*/ `
        <div class="progressBarContainer">
            <div class="statsBarRow">
                <div class="statName">HP</div>
                <div class="progress">
                    <div class="progressBar" style="width: ${hp / 1.7}%; background-color: #278BCC;">${hp}</div>
                </div>
            </div>
            <div class="statsBarRow">
                <div class="statName">Attack</div>
                <div class="progress">
                    <div class="progressBar" style="width: ${attack / 1.7}%; background-color: #E53B18;">${attack}</div>
                </div>
            </div>
            <div class="statsBarRow">
                <div class="statName">Defense</div>
                <div class="progress">
                    <div class="progressBar" style="width: ${defense / 1.7}%; background-color: #59A952;">${defense}</div>
                </div>
            </div>
            <div class="statsBarRow">
                <div class="statName">Sp. Atk</div>
                <div class="progress">
                    <div class="progressBar" style="width: ${sa / 1.7}%; background-color: #b73016;">${sa}</div>
                </div>
            </div>
            <div class="statsBarRow">
                <div class="statName">Sp. Def</div>
                <div class="progress">
                    <div class="progressBar" style="width: ${sd / 1.7}%; background-color: #387532;">${sd}</div>
                </div>
            </div>
            <div class="statsBarRow">
                <div class="statName">Speed</div>
                <div class="progress">
                    <div class="progressBar" style="width: ${speed / 1.7}%; background-color: #F26200;">${speed}</div>
                </div>
            </div>
        </div>
    `;
}


function createHtmlForMoves(move) {
    return `
        <div class="type typeMoves">${move}</div>
    `;
}