window.onload = function(){
  console.log("js is working fine");
  setGenerationUrls();
  // setPokemons(gen1,  "https://pokeapi.co/api/v2/generation/1/");
}
// TO DO
// 1. connect Pokemon API
// 2. generate detailed data out of API
// 3. get all generations https://pokeapi.co/api/v2/generation/
// 4.

// START SCREEN
// user choose difficulty / pokemon generation
const url = "https://pokeapi.co/api/v2/generation/"
let generationUrls = [];

let gen1 = [];
let gen2 = [];
let gen3 = [];
let gen4 = [];
// let pokemons = [];

const setGenerationUrls = function() {
  fetch(url)
  .then(data => {
    return data.json();
  }).then( json => {
    // setting generation urls to generationUrls array
    for (let i=0; i<json.results.length; i++){
      generationUrls[i] = json.results[i].url;
    }
    //console.log urls
    console.log("urls: " + generationUrls);
    // console.log(pokemons[0].name);
    setPokemons(generationUrls[0]);

  })
}
//
const setPokemons = function(url) {
  fetch(url)
  .then(pokeData => {
    return pokeData.json();
  })
  .then(pokeJson => {
    // for(let i=0; i< pokeJson.)
    // console.log(pokeJson);
    let pokemons = pokeJson.pokemon_species;
    // console.log(pokemons);
    let poke_names = [];
    let poke_urls = [];
    for(i=0; i< pokemons.length; i++) {
      gen1.push({
        id: (i+1),
        name: pokemons[i].name,
        img_url: "https://pokeres.bastionbot.org/images/pokemon/" + (i+1) + ".png"
      })
    }
    console.log(gen1);
  })
}




// CREATE GAME STATUS DATA OBJECT
const GameData = {
  user:[],
  isPlaying: false, // status of the game
  difficultyLevel: null, // decides sets of different pokemon series
  pokeBank: null, // sets pokemon names in an array
  pokeId: null, // sets pokemon id of pokeBank array

  numberOfGuess: 10, // number of user's guesses
  showWord: null
  // user: [], // list of users
  //   isPlaying: false, // the status of the game
  //   //playerTurn: 0, // indicates 'who is playing' supports multiplayers
  //   difficultyLevel: null, // refers to 'difficulty level'
  //   pokeId: null,  // selected pokemon image
  //   wordBank: null, // which wordbank to get word from
  //   word: null, // current word
  //   shownWord: null,
  //   guess: 10, //
  //   score: 0,
  //   round: 0,

}

// GAME CONTROLLER


// VIEW ENGINE
