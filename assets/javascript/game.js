
var winCount=0, lostCount=0, guessCount=0, totalGuess=15, numOfWords=4, n=0;
var wordsToGuess = ["gryffindor", "slytherin", "rawenclaw", "hufflepuff"]
var lostLetters = [], guessedLetters = [];

var hogHouses = {
	"gPlaceHolder": ["_","_","_","_","_","_","_","_","_","_"],
	"sPlaceHolder": ["_","_","_","_","_","_","_","_","_"],
	"rPlaceHolder": ["_","_","_","_","_","_","_","_","_"],
	"hPlaceHolder": ["_","_","_","_","_","_","_","_","_","_"],

	printLetters: function(arr, idName) {
		var word="";
		for (var i = 0; i < arr.length; i++) {
			word+=arr[i];
		}
		// 	document.querySelector("#curWord").innerHTML = word;
		// 	document.getElementById("#guessedWrd").innerHTML = word;
		document.getElementById(idName).innerHTML = word;
	},

	winCountFn: function() {
		winCount++;
	},

	guessCountFn: function() {
		guessCount++;
		if (guessCount==totalGuess) {
			lostCount++;
			//display next word
		}
	}
};

function resetNextWord() {				
	//display next word
	n++;
	if(n===1) {
		guessedLetters = hogHouses.sPlaceHolder;
	}
	else if(n===2) {
		guessedLetters = hogHouses.rPlaceHolder;
	}
	else if(n===3) {
		guessedLetters = hogHouses.hPlaceHolder;
	}
	hogHouses.printLetters(guessedLetters, "curWordId");
	// reset variables
	lostLetters = [];
	hogHouses.printLetters(lostLetters, "lostWrdId");
	guessCount=0;
}

function evaluateLetter(userGuess, m) {
	userGuess = userGuess.toLowerCase();
	// convert the typed letter to ascii code
	asciiChar = userGuess.charCodeAt(0);
	// check if the typed letter is alphabet
	if(asciiChar>=97 && asciiChar<=122) {
		guessCount++;
		// check guess count reached max
		if (guessCount>totalGuess) {
			lostCount++;
			document.getElementById("loseCntId").innerHTML = lostCount;
			resetNextWord();
		}
		// if guess count is not max
		else {
			var word = wordsToGuess[m];
			console.log(word);
			var wordGuessed=false;
			// check whether all the letters are guessed
			for (var i = 0; i < guessedLetters.length; i++) {
				if(guessedLetters[i]==="_") {
					wordGuessed=false;
					break;
				}
				else
					wordGuessed=true;
			}
			if(wordGuessed) {
				winCount++;
				document.getElementById("winCntId").innerHTML = winCount;
				//display sound
				// var audio = new Audio('assets/images/brilliant.wav');
				// audio.play();
				resetNextWord();				
			}
			// if still more letters to be guessed
			else {				
				// find whether the letter typed is in the word
				var indices = [];
				for(var i=0; i<word.length;i++) {
				    if (word[i] === userGuess) {
				    	indices.push(i);
				    }
				}
				console.log(indices.length);
				// if the letter is present display in current word
				if(indices.length > 0) {
					for (var i = 0; i < indices.length; i++) {
						var gIndex = indices[i];
						guessedLetters[gIndex] = userGuess;
					}
					hogHouses.printLetters(guessedLetters, "curWordId");
				}
				// if the letter is not present display in lost letters list
				else if(indices.length == 0) {	
					var flag=false
					for (var i = 0; i < lostLetters.length; i++) {
						if(lostLetters[i]===userGuess) {
							flag=true;
							break;
						}
						else
							flag=false;
					}	
					if(!flag)
						lostLetters.push(userGuess);
					hogHouses.printLetters(lostLetters, "lostWrdId");
					console.log(lostLetters);
				}	
				// display remaining guess count				
				var remainGuesses = totalGuess - guessCount;
				document.getElementById("remainGuessId").innerHTML = remainGuesses;
			}
		}
	}
}

// gryffindor word
if(n===0) {
	guessedLetters = hogHouses.gPlaceHolder;
	hogHouses.printLetters(guessedLetters, "curWordId");
}

// first key press to invoke the game
// document.onkeypress = function(event) {
// 	hogHouses.printLetters(hogHouses.gPlaceHolder, "curWord");	
// }

document.onkeyup = function(event) {
	var userGuess = event.key;
	evaluateLetter(userGuess,n);
}