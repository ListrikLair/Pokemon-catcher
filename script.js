// model
let app = document.getElementById('app')
const wildPokemon = {
    'normalPokemon': [
        '<img src="./img/primeape.png" alt="" />',
        '<img src="./img/tsareena.png" alt="" />',
        '<img src="./img/pikachu.png" alt="" />',
        '<img src="./img/kricketune.png" alt="" />',
        '<img src="./img/avalugg.png" alt="" />',
        '<img src="./img/rapidash.png" alt="" />',
        '<img src="./img/scraggy.png" alt="" />',
    ],
    'rarePokemon': [
        '<img src="./img/regigigas.png" alt="" />',
        '<img src="./img/mewtwo.png" alt="" />',
        '<img src="./img/entei.png" alt="" />',
        '<img src="./img/xerneas.png" alt="" />',
    ],
    'shinyPokemon': [
        '<img src="./img/shUmbreon.png" alt="" />',
        '<img src="./img/shGible.png" alt="" />',
        '<img src="./img/shGyarados.png" alt="" />',
        '<img src="./img/shMew.jfif" alt="" />',
    ]
};
let currentWildPokemon;
let lastWildPokemon;
let myPokemon = [];
let box = 'closed';

// view
updateView();
randomizePokemon();
function updateView(){
app.innerHTML = /*HTML*/`
    <div id="view">
        <div id="wildPokemon">${currentWildPokemon}</div>
        <button id="catchButton" onclick="catchPokemon()">Catch</button>
        <button id="fleeButton" onclick="fleePokemon()">Flee</button>
        <div id="pokemonBox"></div>
    </div>
`;
updateViewBox();
}

function openBox(){
    if (box == 'closed'){
        box = 'open'
    } else if (box == 'open'){
        box = 'closed'
    }
updateViewBox()
}

function updateViewBox(){
    if (box == 'open'){
        document.getElementById('pokemonBox').innerHTML = /*HTML*/`
        <div id="pokeball" onclick="openBox()"><img src="./img/pokeball.png" alt="" /></div>
            <div id="boxGrid">
                <div>${myPokemon[0] || ''}</div>
                <div>${myPokemon[1] || ''}</div>
                <div>${myPokemon[2] || ''}</div>
                <div>${myPokemon[3] || ''}</div>
                <div>${myPokemon[4] || ''}</div>
                <div>${myPokemon[5] || ''}</div>
            </div>
        `;
    } else if (box == 'closed'){
        document.getElementById('pokemonBox').innerHTML = 
        '<div id="pokeball" onclick="openBox()"><img src="./img/pokeball.png" alt="" /></div>';
    }
}

// controller
function catchPokemon(){
    if (myPokemon.length <= 5){
    myPokemon.push(currentWildPokemon);
} else {
    myPokemon.shift();
    myPokemon.push(currentWildPokemon);
}
    setTimeout(randomizePokemon, 500);
}

function fleePokemon(){
    randomizePokemon();
}

function randomizePokemon(){
    lastWildPokemon = currentWildPokemon;
    let randomPokemonType;
    let randomIndex = Math.floor(Math.random()*100);
    if (randomIndex <= 85){
        randomPokemonType = 'normalPokemon';
    } else if (randomIndex <= 94){
        randomPokemonType = 'rarePokemon';
    } else if (randomIndex <= 99){
        randomPokemonType = 'shinyPokemon';
    }
    currentWildPokemon = wildPokemon[randomPokemonType][Math.floor(Math.random()*wildPokemon[randomPokemonType].length)];
    if (lastWildPokemon == currentWildPokemon){
        return randomizePokemon();
    }
    updateView();
}