// TO DO
// set up the game essentials
//
const myCanvas = $("myCanvas");
const url = "https://pokeapi.co/api/v2/generation/"
// let pokemons = [];


//


// CREATE GAME STATUS DATA OBJECT
const GameData = {
  // user:[],
  isPlaying: false, // status of the game
  generationUrls: [], // decides sets of different pokemon series
  level: 0,
  pokeBank: [], // sets pokemon names in an array
  pokeId: null, // sets pokemon id of pokeBank array
  showWord: null,
  score: 0,
  guess: 10,

  setGenerationUrls: function(level) {
    fetch(url)
    .then(data => {
      return data.json();
    }).then( json => {
      // setting generation urls to generationUrls array
      for (let i=0; i<json.results.length; i++){
        this.generationUrls[i] = json.results[i].url;
      }
      //console.log urls
      console.log("urls: " + this.generationUrls);

      console.log(this.level);
      // console.log(pokemons[0].name);
      return this.level;
    }).then( level => {
      this.setPokemons(this.generationUrls[level]);
    })
  },

  setPokemons: function(level) {
    fetch(url + level + "/")
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
        this.pokeBank.push({
          id: (i+1),
          name: pokemons[i].name,
          img_url: "https://pokeres.bastionbot.org/images/pokemon/" + (i+1) + ".png"
        })
      }
      console.log(this.pokeBank);
    })
  },

  chooseRandomPoke() {
    // console.log(this.pokeBank);
    var pokemon = this.pokeBank[Math.floor(Math.random()*this.pokeBank.length)];
    this.word = pokemon;
    return this.word;
  },

  // CHECKING IF THE LETTER IS RIGHT
  letterInWord(letter) {
    for(i=0; i<this.word.length; i++) {
      if(letter == this.word[i]) {
        return true
      } else {
        return false
      }
    }
  }
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
  GameData.chooseRandomPoke();
  ViewEngine.prepareAlphabets();
  },

  setPokemon() {

  }
}

// VIEW ENGINE
const ViewEngine = {

  prepareAlphabets() {
    let alphabetsContainer = $(".alphabetsContainer")
    for(i=0; i<26; i++) {
      let letter = String.fromCharCode(65 + i);
      let letterButton = document.createElement("button");
      $(letterButton).text(letter);
      $(letterButton).attr('id', letter);
      $(letterButton).addClass('letters');
      $(alphabetsContainer).append(letterButton);
      // $(letterButton).click({letterId: letter}, GameController.)
    }
  }
}

window.onload = function() {
  console.log("js is working fine");
  GameData.setPokemons(1);
  // set pokemons depending on user's choice of generation
  $("select").change(function() {
    let level = 0;
    $("select option:selected").each(function() {
      level = $(this).val();
      GameData.setPokemons(level);
    })
  });
  $('#playGame').click(GameController.startGame);
  // GameData.setGeneration(1);
  // GameData.chooseRandomPoke();
  // console.log(gen1);
}

// VIEW ENGINE
