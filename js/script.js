// TO DO
// set up the game essentials
//
// const myCanvas = $("myCanvas");
const url = "https://pokeapi.co/api/v2/generation/"
// let pokemons = [];

// function preload() {
//
// }
// function setup() {
//     const canvasHolder = select('.p5Canvas');
//     let canvas = createCanvas(500,500).parent(canvasHolder);
//     background(100);
//     // canvas.parent('p5Canvas');
// }
//
// function draw() {
//   // background(0);
// }

//


// CREATE GAME STATUS DATA OBJECT
const GameData = {
  // user:[],
  isPlaying: false, // status of the game
  generationUrls: [], // decides sets of different pokemon series
  level: 0,
  pokeBank: [], // sets pokemon names in an array
  // pokemon: null,
  pokeId: null, // sets pokemon id of pokeBank array
  pokeWord: null,
  pokeImg: null,

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
    this.pokeId = pokemon.id;
    this.pokeWord = pokemon.name;
    this.pokeImg = pokemon.img_url;
    console.log(this.pokeWord + "/" + this.pokeId + "/" + this.pokeImg);
    return pokemon;
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
    GameData.isPlaying = true;
    GameData.chooseRandomPoke();
    ViewEngine.prepareAlphabets();
    ViewEngine.showPokeImg();
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

  showPokeImg() {
    let pokemonBox = $(".pokemonBox");
    pokemonBox.empty();
    let img = $('<img id="pokeImg">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', GameData.pokeImg);
    img.appendTo(pokemonBox);
    console.log(GameData.pokeWord);
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
