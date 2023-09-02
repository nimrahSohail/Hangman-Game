let keyboardDiv  = document.querySelector(".keyboard");
let wordDisplay = document.querySelector(".word-display");
let guessesText = document.querySelector(".guesses-text b");
let hangmanImage = document.querySelector(".hangman-box img");
let gameModal = document.querySelector(".game-modal");
let playAgain = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount = 0;
let maxGuesses = 6;

let resetGame = () => {
    //reseting all game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter guessed"></li>`).join("");
    gameModal.classList.remove("show");

}

let getRandomWord = () => {
    
let {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
currentWord = word;
console.log(word);

document.querySelector(".hint-text b").innerText = hint;

resetGame();
};

let gameOver = (isVictory) => {
    //after 600ms this screen will appear showing the status
    setTimeout(() => {
        let modalText = isVictory ? `You found the word:`: `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory': 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!': 'Game Over'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;

        gameModal.classList.add("show");
    }, 300);
}

let initGame = (button, clickedLetter) => {
    //checking if letter matches the word or not
    if(currentWord.includes(clickedLetter)){
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
   else{
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
   }
   button.disabled = true;
   guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

   //calling game over function if any of the following conditions fulfill
   if(wrongGuessCount === maxGuesses) return gameOver(false);
   if(correctLetters.length === currentWord.length) return gameOver(true);
}

//Creating keyboard buttons and add event listener
for (let i = 97; i <= 122; i++){
    let button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgain.addEventListener("click",getRandomWord);