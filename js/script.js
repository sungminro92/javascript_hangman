// TO DO
// set up the game essentials
//
// const myCanvas = $("myCanvas");
const url = "https://pokeapi.co/api/v2/generation/"

// load pokemons into one array
//
function loadPokemons(level) {
  GameData.pokeBank = []; // array of pokemon
  let generation = level;
  for(i=1; i<9; i++) { // loop through all 9 generation of pokemons
    fetch(url + i + "/")
    .then(pokeData => {
      return pokeData.json(); // generation json data
    })
    .then(pokeJson => {
      for(j=0; j<pokeJson.pokemon_species.length; j++) { // start setting individual pokemon
        let pokemon = pokeJson.pokemon_species[j]
        let pokeName = pokemon.name;
        let pokeUrl = pokemon.url
        let pokemonId;
        fetch(pokeUrl)
        .then(pokemonUrl => {
          return pokemonUrl.json();
        })
        .then(pokemonUrlJson => {
          let gen = pokemonUrlJson.generation.name;
          if(gen == "generation-i") {
            gen = 1;
          } else if (gen == "generation-ii") {
            gen = 2;
          } else if (gen == "generation-iii") {
            gen = 3;
          } else if (gen == "generation-iv") {
            gen = 4;
          } else if (gen == "generation-v") {
            gen = 5;
          } else if (gen == "generation-vi") {
            gen = 6;
          } else if (gen == "generation-vii") {
            gen = 7;
          } else if (gen == "generation-viii") {
            gen = 8;
          } else {
            gen = null;
          }
          pokemonId = pokemonUrlJson.id;
          GameData.pokeBank.push({
              id: pokemonId,
              name: pokeName,
              gen: gen
          });
          // return pokemonId;
        })
        // .then(pokemonId => {
        //
        //   return
        // })
      } // end of setting each pokemon loop
    })
  }
  console.log(GameData.pokeBank);
  return GameData.pokeBank;
}

// CREATE GAME STATUS DATA OBJECT
const GameData = {
  isPlaying: false, // status of the game
  generationUrls: [], // decides sets of different pokemon series
  level: 0,
  pokeBank: [], // sets pokemon names in an array
  // pokemon: null,
  pokeId: null, // sets pokemon id of pokeBank array
  pokeWord: null,
  pokeImg: null,

  playerName: null,
  score: 0,
  guess: 10,

  scoreIncrement: () => {
    this.score++;
  },

  guessDecrement: () => {
    this.guess--;
  },

  setPlayerName: (userName) => {
    this.playerName = userName;
  },

  setGeneration: (generation) => {
    this.generation = generation;
    console.log(this.generation);
  },

  letterInWord(letter) {
      for (i=0;i<this.word.length;i++) {
        if (letter == this.word[i]) {
          return true;
        }
      }
      return false;
    },

  chooseRandomPoke: function() {
    let randomNumber = Math.floor(Math.random()*this.pokeBank.length)
    let pokemon = this.pokeBank[randomNumber];
    // console.log(randomNumber);
    this.pokeWord = pokemon.name;
    this.pokeId = pokemon.id;
    return this.pokeId;
  },

  loadPokeImgs: function() {
    let number = this.chooseRandomPoke();
    let imgUrl = "https://pokeres.bastionbot.org/images/pokemon/";
    let img = imgUrl + number  +  ".png";
    console.log(img);
    let imgTag = $(document.createElement("img"));
    let pokemonBox = $(".pokemonBox");
    pokemonBox.empty();
    imgTag.attr("src", img);
    imgTag.attr("width", "500px");
    imgTag.appendTo(pokemonBox);
    imgTag.attr("id", this.pokeId)
  },


  //   difficultyLevel: null, // refers to 'difficulty level'


  //   word: null, // current word
  //   shownWord: null,
  //   guess: 10, //
  //   score: 0,
  //   round: 0,
}

// GAME CONTROLLER
const GameController = {
  startGame() {
    GameData.isPlaying = true;
    // GameData.chooseRandomPoke();
    ViewEngine.prepareAlphabets();
    // ViewEngine.showPokeImg();
    GameData.loadPokeImgs();
  },

}

// VIEW ENGINE
const ViewEngine = {
  prepareAlphabets() {
    let alphabetsContainer = $(".alphabetsContainer")
    alphabetsContainer.empty();
    for(i=0; i<26; i++) {
      let letter = String.fromCharCode(65 + i);
      let letterButton = document.createElement("button");
      $(letterButton).text(letter);
      $(letterButton).attr('id', letter);
      $(letterButton).addClass('letters');
      $(alphabetsContainer).append(letterButton);
      // $(letterButton).click({letterId: letter}, GameController.)
    }
  },
}

loadPokemons(1);

window.onload = function() {
  console.log("js is working fine");

  // set pokemons depending on user's choice of generation

  $("select").change(function() {
    let generation = 1;
    $("select option:selected").each(function() {
      generation = $(this).val();
      GameData.setGeneration(generation);
    })
  });


  $('#playGame').click(GameController.startGame);
  // GameData.setPokemons();
  // GameData.chooseRandomPoke();
  // console.log(gen1);
}

// VIEW ENGINE
