// TO DO
// set up the game essentials
//
// const myCanvas = $("myCanvas");
const url = "https://pokeapi.co/api/v2/generation/"

// load pokemons into one array
//
function loadPokemons(level) {
  GameData.pokeBank = [];
  let generation = level;
  for(i=1; i<9; i++) {
    // console.log(url+i);
    fetch(url + i + "/")
    .then(pokeData => {
      return pokeData.json();
    })
    .then(pokeJson => {
      for(j=0; j<pokeJson.pokemon_species.length; j++) {
          let pokemon = pokeJson.pokemon_species[j]
          let pokeName = pokemon.name;
          let pokeUrl = pokemon.url
          let pokemonId;
          fetch(pokeUrl)
          .then(pokemonUrl => {
            return pokemonUrl.json();
          })
          .then(pokemonUrlJson => {
            pokemonId = pokemonUrlJson.id;
            console.log(pokemonId);
            return pokemonId;
          })
          .then(pokemonId => {
            GameData.pokeBank.push({
                id: pokemonId,
                name: pokeName
            });
          })
      }
      console.log(GameData.pokeBank);
    })
    // .then(pokeJson => {
    //   // console.log(pokeJson.pokemon_species);
    //   let pokemons = pokeJson.pokemon_species;
    //   // let poke_names = [];
    //   // let poke_urls = [];
    //   for(j=0; j< (pokemons.length); j++) {
    //   let name = pokemons[j].name;
    //     GameData.pokeBank.push(name);
    //   }
    // })
    // generation++;
    // console.log(GameData.pokeBank);
  }
  return GameData.pokeBank;

}




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

  // setGenerationUrls: function(level) {
  //   fetch(url)
  //   .then(data => {
  //     return data.json();
  //   }).then( json => {
  //     // setting generation urls to generationUrls array
  //     for (let i=0; i<json.results.length; i++){
  //       this.generationUrls[i] = json.results[i].url;
  //     }
  //     //console.log urls
  //     console.log("urls: " + this.generationUrls);
  //
  //     console.log(this.level);
  //     // console.log(pokemons[0].name);
  //     return this.level;
  //   }).then( level => {
  //     this.setPokemons(this.generationUrls[level]);
  //   })
  // },

  // setPokemons: function(level) {
  //   this.pokeBank = [];
  //   let generation = level;
  //   for(i=1; i<9; i++) {
  //     fetch(url + generation + "/")
  //     .then(pokeData => {
  //       return pokeData.json();
  //     })
  //     .then(pokeJson => {
  //       // for(let i=0; i< pokeJson.)
  //       // console.log(pokeJson);
  //       let pokemons = pokeJson.pokemon_species;
  //       // console.log(pokemons);
  //       let poke_names = [];
  //       let poke_urls = [];
  //       for(i=0; i< pokemons.length; i++) {
  //         this.pokeBank.push({
  //           name: pokemons[i].name,
  //           // poke_url: pokemons[i].url
  //         })
  //       }
  //     })
  //     generation++;
  //   }
  //   console.log(this.pokeBank);
  // },

  chooseRandomPoke: function() {
    let randomNumber = Math.floor(Math.random()*this.pokeBank.length)
    let pokemon = this.pokeBank[randomNumber];
    console.log(randomNumber);
    console.log(pokemon);
    this.pokeId = pokemon.id;
    console.log(this.pokeId)
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

//   showPokeImg() {
//     let pokemonBox = $(".pokemonBox");
//     pokemonBox.empty();
//     let img = $('<img id="pokeI">'); //Equivalent: $(document.createElement('img'))
//     img.attr('src', GameData.pokeImg);
//     img.attr('width', '500px');
//     img.appendTo(pokemonBox);
//     console.log(GameData.pokeWord);
//   }
// }

loadPokemons(1);
// loadPokeImgs();

window.onload = function() {
  console.log("js is working fine");

  // set pokemons depending on user's choice of generation

  // $("select").change(function() {
  //   let level = 0;
  //   $("select option:selected").each(function() {
  //     level = $(this).val();
  //     GameData.setPokemons(level);
  //   })
  // });


  $('#playGame').click(GameController.startGame);
  // GameData.setPokemons();
  // GameData.chooseRandomPoke();
  // console.log(gen1);
}

// VIEW ENGINE
