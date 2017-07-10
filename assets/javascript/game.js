
var winCount=0, lostCount=0, guessCount=0, totalGuess=15, numOfWords=4, n=0;
var remainGuesses;
var wordsToGuess = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"]
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
		document.getElementById(idName).innerHTML = word;
	},

	changeHouseEmblem: function(hdr, imgName) {
		document.getElementById("gameHdr3").innerHTML = hdr;				
		document.getElementById("imgHogwarts").src="assets/images/"+imgName;
	}
};

function resetNextWord() {				
	//display next word
	n++;
	if(n===1) {
		guessedLetters = hogHouses.sPlaceHolder;
		hogHouses.printLetters(guessedLetters, "curWordId");
	}
	else if(n===2) {
		guessedLetters = hogHouses.rPlaceHolder;
		hogHouses.printLetters(guessedLetters, "curWordId");
	}
	else if(n===3) {
		guessedLetters = hogHouses.hPlaceHolder;
		hogHouses.printLetters(guessedLetters, "curWordId");
	}
	else if(n===4) {
		document.getElementById("curWordId").innerHTML = "";
		document.getElementById("remainGuessId").innerHTML = "";
	}	
	// reset variables
	lostLetters = [];
	hogHouses.printLetters(lostLetters, "lostWrdId");
	guessCount=0;
}

function endWordOrGuessCount() {	
	// check guess count reached max
	if (remainGuesses===0) {
			lostCount++;
			document.getElementById("loseCntId").innerHTML = lostCount;
			document.getElementById("remainGuessId").innerHTML = "";
			resetNextWord();
	}
	else {
		// check whether all the letters are guessed
		var wordGuessed=false;
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
			// change house emblem
			if(n===0) {
				hogHouses.changeHouseEmblem("Gryffindor","gryffindor.jpg");
			}
			else if(n===1) {
				hogHouses.changeHouseEmblem("Slytherin","slytherin.jpg");
			}
			else if(n===2) {
				hogHouses.changeHouseEmblem("Rawenclaw","rawenclaw.jpg");
			}
			else if(n===3) {
				hogHouses.changeHouseEmblem("Hufflepuff","hufflepuff.jpg");
			}
			document.getElementById("remainGuessId").innerHTML = "";
			//display sound
			var audio = new Audio("../Hangman_Game/assets/images/brilliant.mp3");
			audio.play();
			resetNextWord();				
		}
	}
}

function evaluateLetter(userGuess, m) {
	userGuess = userGuess.toLowerCase();
	// convert the typed letter to ascii code
	asciiChar = userGuess.charCodeAt(0);
	// check if the typed letter is alphabet
	if(asciiChar>=97 && asciiChar<=122) {
		var alreadyExists=false;
		for (var i = 0; i < guessedLetters.length; i++) {
			if (guessedLetters[i]===userGuess) {
				alreadyExists=true;
				break;
			}
		}
		if(!alreadyExists) {
			for (var i = 0; i < lostLetters.length; i++) {
				if (lostLetters[i]===userGuess) {
					alreadyExists=true;
					break;
				}
			}
		}
		if(!alreadyExists) {
			guessCount++;		
			var word = wordsToGuess[m];
			console.log(word);							
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
			remainGuesses = totalGuess - guessCount;
			document.getElementById("remainGuessId").innerHTML = remainGuesses;	
			endWordOrGuessCount();	
		}
	}
}

hogHouses.changeHouseEmblem("Guess Hogwarts House","hogwarts.jpg");
// set gryffindor word
if(n===0) {
	guessedLetters = hogHouses.gPlaceHolder;
}
//main
var eventFlag=true;
document.onkeyup = function(event) {
	var userGuess = event.key;
	// set flag for first event to start the game
	if(eventFlag) {
		hogHouses.printLetters(guessedLetters, "curWordId");
		eventFlag=false;
	}
	else {
		if(n<4)
			evaluateLetter(userGuess,n);
	}
}