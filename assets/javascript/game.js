// SETTINGS
let $word = document.getElementById('placeholders')
let $lettersGuessed = document.getElementById('lettersGuessed')
let $livesCount = document.getElementById('livesCount')

let $wins = document.getElementById('wins')
$wins.innerText = 0
let $losses = document.getElementById('losses')
$losses.innerText = 0

// let foodBank = ["dole whip"]
let foodBank = ["dole whip", "dipping dots", "corn dog", "fried oreos", "cheese fries", "slushie", "chicken tenders", "churros", "turkey leg", "candy apple", "beignets", "mac n cheese"]
let currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

let letters = []
let $newGameButton = document.getElementById('newGameButton')
let $gamePage = document.getElementById('gamePage')
let $introPage = document.getElementById('introPage')
let $resetButton = document.getElementById('resetButton')


$(document).ready(function () {
    $("#newGameButton").click(function () {
        $(".introPage").addClass("disappear")
        $(".gamePage").removeClass("disappear") //make the counter disappear too
    })
})

// New game
function startGame() {
    letters = [];
    currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

    $livesCount.innerText = 8
    $word.innerText = hideString(currentFoodItem, letters)
    // $lettersGuessed.innerText = ""
}

$newGameButton.addEventListener('click', () => {
    startGame()
    let audio = new Audio("assets/audio/jiminycricket.mp3")
    audio.play()
})

$resetButton.addEventListener('click', () => {
    $wins.innerText = 0
    $losses.innerText = 0
    $livesCount.innerText = 8
    startGame()
})

function hideString(foodString, array) {
    let finalWord = ""
    for (let i = 0; i < foodString.length; i++) {
        if (array.includes(foodString[i])) {
            finalWord += foodString[i]
        } else if (foodString[i] === " ") {
            finalWord += "  "
        } else {
            finalWord += "_"
        }
    }
    return finalWord
}

function checkUserInput(input) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    let lowerInput = input.toLowerCase()
    let validLetter = alphabet.includes(lowerInput)

    if (validLetter && !letters.includes(lowerInput)) {
        letters.push(lowerInput)
    } else if (validLetter && letters.includes(lowerInput)) {
        alert('Choose another letter!')
        //play a buzzer sound?
    }

    if (validLetter && !currentFoodItem.toLowerCase().includes(lowerInput)) {
        $livesCount.innerHTML -= 1
    }
}

function checkWinner(string, array) {
    for (let i = 0; i < string.length; i++) {
        if (!array.includes(string[i])) {
            return false
        }
    }
    return true
}

function checkGameStatus() {
    if ($livesCount.innerHTML === "0") {
        $losses.innerText = parseInt($losses.innerText) + 1
        alert("Womp Womp, You Lose! Play Again!") //need to make it go to 0 lives first
        startGame()
    }

    if (checkWinner(currentFoodItem, letters)) {
        $wins.innerText = parseInt($wins.innerText) + 1//how to check if word is complete?
        alert("Woohoo, You Won!")
        startGame()
    }
}

// function changeImgDiv() {
//     if ($livesCount.innerHTML === "7") {
//         var image = document.getElementsByClassName("hangImgDiv");
//         image.src = "assets/images/2-";
//     }
// }

document.addEventListener("keyup", (event) => {

    checkUserInput(event.key)
    checkGameStatus()
    $word.innerText = hideString(currentFoodItem, letters)

    for (let i = 0; i < 26; i++) {
        if (event.key === document.getElementById(`${i}`)) {
            document.getElementById(`${i}`).style.opacity = ".5";
        }
    }

})

// function endGame()
// restart new game if player won or if lives are at 0
//hide answer in console so people can't cheat
//remove already played word from foodBank
//make blocks transparent when pressed