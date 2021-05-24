// TO DO
// set up the game essentials
//
// const myCanvas = $("myCanvas");
const url = "https://pokeapi.co/api/v2/generation/"

const loader = $("#loaderConatiner");
// loading animation control
function displayLoading() {
  loader.addClass("display");

}

function hideLoading() {
  loader.removeClass("display");
}

// load pokemons into one array
function loadPokemons() {
  displayLoading();
  GameData.pokeBank = []; // array of pokemon
  for(i=1; i<3; i++) { // loop through all 9 generation of pokemons
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
      } // end of setting each pokemon loop
    })
  }
  hideLoading();
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
  generation: 1,
  pokeId: null, // sets pokemon id of pokeBank array
  pokeWord: null,
  pokeImg: null,

  playerName: null,
  score: 0,
  guess: 10,

  scoreIncrement: () => {
    this.score++;
  },

  setUserName: (name) => {
    if(name == "") {
      this.playerName = "Anonymous";
      $('#playerName').text(this.playerName); // display player's name in the game screen
    } else {
      this.playerName = name;
      $('#playerName').text(this.playerName);
    }
  },

  setGeneration: (gen) => {
    this.generation = gen;
    console.log("generation changed to - " + this.generation);
  },

  letterInWord: function(letter) {
      for (i=0;i<this.pokeWord.length; i++) {
        if (letter.toLowerCase() == this.pokeWord[i]) {
          return true;
        }
      }
      return false;
    },

  chooseRandomPoke: function() {
    // let it = this.generation;
    // console.log(it); // I'm not sure why this line isn't working.

    let newPokeBank = this.pokeBank.filter(function(d) {
      return d. gen == this.generation; });
    let randomNumber = Math.floor(Math.random()*newPokeBank.length);
    let pokemon = newPokeBank[randomNumber];
    console.log(randomNumber);
      let nameArray = pokemon.name.split("");
      for(i=0; i<nameArray.length; i++) {
        if(nameArray[i] == "-") {
          nameArray.splice(i,1);
        }
      }
      this.pokeWord = nameArray.join("");
      console.log(this.pokeWord);

    // this.pokeWord = pokemon.name;
    this.pokeId = pokemon.id;
    console.log(this.pokeWord + "/" + this.pokeId);
    return this.pokeId;
  },

  loadPokeImgs: function() {
    let number = this.chooseRandomPoke();
    let imgUrl = "https://pokeres.bastionbot.org/images/pokemon/";
    let img = imgUrl + number  +  ".png";
    let imgTag = $(document.createElement("img"));
    let pokemonBox = $(".pokemonBox");
    pokemonBox.empty();
    imgTag.attr("src", img);
    imgTag.addClass("pokeImg");
    imgTag.attr("width", "300px");
    imgTag.appendTo(pokemonBox);
    imgTag.attr("id", this.pokeId);

  },

  winCheck: function() {
    var wordArray = this.pokeWord.split("");
    for (let i=0;i<wordArray.length;i++) {
      let letter = $("#letter" + i);
      if (letter.text() == "") {
        return false;
      }
    }
    return true;
  },

  resetGameData: function() {
    this.guess = 10;
    this.score = 0;
  },
}

const ViewEngine = {
  prepareAlphabets() {
    let alphabetsContainer = $(".alphabetsContainer")
    alphabetsContainer.empty();
    for(i=0; i<26; i++) {
      let letter = String.fromCharCode(65 + i);
      let letterButton = document.createElement("button");
      $(letterButton).text(letter);
      $(letterButton).attr('id', letter); // id is each alphabet in the word
      $(letterButton).addClass('letters');
      $(letterButton).addClass('flex');
      $(letterButton).addClass('flex-wrap');
      $(alphabetsContainer).append(letterButton);
      $(letterButton).click({letterId: letter}, GameController.checkLetterClick);
    }
  },

  // set mystery empty letters
  showMysteryWord(word) {
    let wordBox = $('#letterGuessContainer')
    let wordArray = word.split("");
    wordBox.empty();
    for (i = 0; i < wordArray.length; i++) {
      if(wordArray[i] == '-') {
        console.log(" - is taken out");
      } else {
        let letterGuessDiv = document.createElement("div");
        $(letterGuessDiv).addClass("letterGuessDiv");
        $(letterGuessDiv).attr("id", "letter"+i+"");
        wordBox.append(letterGuessDiv);
      }
    }

  },

  revealLetter(letter) {
    let pokeWordArray = GameData.pokeWord.split("");
    for(i=0; i<pokeWordArray.length; i++) {
      if(letter.toLowerCase() == pokeWordArray[i]) {
        $('#letter'+i).text(letter);
      }
    }
  },

  addAttrByClass: function(className, attribute) { // useful to add attribute to classes
    $('.' + className).attr(attribute, true);
  },

  addAttrById: function(idName, attribute) {
    $('#' + idName).attr(attribute, true);
  },

  addStyleById: function(idName, property, value) {
    $('#' + idName).css(property, value);
  },

  addWrongBar() {
    let pokemonBox = $('.pokemonBox');
    $('.pokemonBox').append('<div class="wrongBar"></div>');
    $(".wrongBar").css("width", pokemonBox.width()/20);
    $('.wrongBar').css("height", pokemonBox.height());
    $('.wrongBar').css("marginLeft", pokemonBox.width()/20);
    // $('.wrongBar').style.marginLeft(pokemonBox.width()/20);
  },

  guessNumber: function() {
    $('#guessNum').text(GameData.guess);
  },

  changeScore: function(score) {
    $("#scoreNum").text(score);
  },

  resetGameScreen: function() {
    $(".alphabetsContainer").empty();
    $("#letterGuessContainer").empty();
    $(".wrongBar").remove();
    $(".pokemonBox").empty();
  },

  endGame: function() {
    GameData.resetGameData();
    this.resetGameScreen();
    $(".pokemonBox").append("<div style='display: block; color: red; font-size: 40px;'>YOUR POKEMON IS LOCKED!</div>")
    $(".pokemonBox").append('<button class="playAgain">PLAY AGAIN</button>');// show Game Over in the box
    $('.pokemonBox button').click(function() {
      console.log("restart");
      GameController.startGame();
    });
  },

  winScreen: function() {
    this.resetGameScreen();
    $(".pokemonBox").append("<div style='display: block; color: red; font-size: 40px;'> YOUR POKEMON IS FREE! </div>");
    $(".pokemonBox").append('<p class="small-font nextPokemon"> Next pokemon in<br><span id="second"></span> seconds...</p>');// show Game Over in the box
      let num = 5;
      let secondSpan = $("#second");
      secondSpan.text(num);
      setInterval(function() {
        num--;
        secondSpan.text(num);
      },1000);
      setTimeout(GameController.startGame, 5000);
      // $(".pokemonBox").append('<button class="playNext"> TRY NEXT </button>');// show Game Over in the box
      // $(".playNext").mouseover(function() {
      //   $('.playNext').css("color", "red");
      // })
      // $('.playNext').mouseover(function() {
      //   $('.playNext').css("color", "black");
      // })
      // $('.pokemonBox button').click(function() {
      //   console.log("restart");
      //   GameController.startGame();
      // });
    },

    changetoGameScreen: function() {
      if($('#startScreen').is(':visible')) {
        $("#startScreen").hide(1000);
      }
      if(!$('#gameScreen').is(':visible')) {
        $("#gameScreen").show(1000);
      }
    },

    changetoStartScreen: function() {
      if($('#gameScreen').is(':visible')) {
        $("#gameScreen").hide(1000);
      }
      if(!$('#startScreen').is(':visible')) {
        $("#startScreen").show(1000);
      }
    }
}

// GAME CONTROLLER
const GameController = {
  startGame() {
    let name = $('#userName').val();
    ViewEngine.addStyleById("guessNum", "color", "black");
    GameData.setUserName(name);
    GameData.isPlaying = true;
    // GameData.chooseRandomPoke();
    ViewEngine.prepareAlphabets();
    // ViewEngine.showPokeImg();
    GameData.loadPokeImgs();
    var word = GameData.pokeWord;
    ViewEngine.showMysteryWord(word);
    GameData.guess = 10;
    ViewEngine.guessNumber();
    ViewEngine.changetoGameScreen();
  },

  // playAgain() {
  //   GameData.score = 0;
  //   GameData.guess = 10;
  // },

// handleLetterClick
  checkLetterClick: function(event) {
    let letterId = event.data.letterId; // this is the alphabet
    console.log(letterId);
    // if correct
    if(GameData.letterInWord(letterId)) {
      console.log("correct letter");
      // reveal the letter in the pokeWord
      ViewEngine.revealLetter(letterId);
      // add 'selected' attribute to the element.
      $("#" +letterId).addClass("selected");
      // add 'disabled' class to elements
    } else {
      console.log("wrong letter");
      $("#" +letterId).addClass("wrong-selected");
      ViewEngine.addWrongBar();
      GameData.guess--;
      ViewEngine.guessNumber();
      ViewEngine.addStyleById("guessNum", "color", "red");
      if(GameData.guess == 0) {
        ViewEngine.endGame();
      }
    }
    ViewEngine.addAttrById(letterId, "disabled");
    if(GameData.winCheck()) {
      GameData.score ++;
      ViewEngine.changeScore(GameData.score);
      ViewEngine.winScreen();
    }
  }
  // put the chosen letter to be .attr("disabled",true);
}



loadPokemons();
GameData.setGeneration(1);

$(document).ready(function() {
  console.log("js is working fine");
  $("select").change(function() {
    let generation = 1;
    $("select option:selected").each(function() {
      generation = $(this).val();
      GameData.setGeneration(generation);

    })
  });
  $('#playGame').click(GameController.startGame);
  $('#resetPokemon').click(GameController.startGame);
  $('#changeGeneration').click(ViewEngine.changetoStartScreen);
})
// VIEW ENGINE
