// SETTINGS
let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
let $word = document.getElementById('placeholders')
let $lettersGuessed = document.getElementById('lettersGuessed')
let $livesCount = document.getElementById('livesCount')

let $wins = document.getElementById('wins')
$wins.innerText = 0
let $losses = document.getElementById('losses')
$losses.innerText = 0

// let foodBank = ["dole whip", "cheese", "cat"] (tester array)
let foodBank = ["dole whip", "dipping dots", "key lime pie", "mickey bars", "corn dog", "shrimp n grits", "fried oreos", "poutine", "cheeseburger", "ice cream sundae", "milkshake", "chicken tenders", "churros", "turkey leg", "candy apple", "beignets", "mac n cheese", "kettlecorn"]
let currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

let letters = []
let $newGameButton = document.getElementById('newGameButton')
let $gamePage = document.getElementById('gamePage')
let $introPage = document.getElementById('introPage')
let $resetButton = document.getElementById('resetButton')
//Sound Effects
let winSound = new Audio("assets/audio/tiggerwin.mp3")
let loseSound = new Audio("assets/audio/poohloses.mp3")

//hide the intro page when new game button is pressed
$(document).ready(function () {
    $("#newGameButton").click(function () {
        $(".introPage").addClass("disappear")
        $(".gamePage").removeClass("disappear") 
    })
})

// START GAME
function startGame() {
    letters = [];
    currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

    $livesCount.innerText = 8
    $word.innerText = hideString(currentFoodItem, letters)
    for (let i = 0; i < alphabet.length; i++) {
        let letterClass = $(`.${alphabet[i]}`)
        letterClass.css('opacity', '1')
    }
    changeImgDiv()
    // $lettersGuessed.innerText = ""

    foodBank.splice(foodBank.indexOf(currentFoodItem), 1)
    //game breaks with no words left in array
    //add reset for foodBank

}

// ON CLICK ENTER GAME PAGE
$newGameButton.addEventListener('click', () => {
    startGame()
    let audio = new Audio("assets/audio/jiminycricket.mp3")
    audio.play()
})

//ON CLICK RESET BUTTON 
$resetButton.addEventListener('click', () => {
    $wins.innerText = 0
    $losses.innerText = 0
    $livesCount.innerText = 8

    startGame()
})

//Turns the random word into a _ string
function hideString(foodString, array) {
    let finalWord = ""
    for (let i = 0; i < foodString.length; i++) {
        if (array.includes(foodString[i])) {
            finalWord += foodString[i]
        } else if (foodString[i] === " ") {
            finalWord += " "
        } else {
            finalWord += "_"
        }
    }
    return finalWord
}

//Checks if input is part of alphabet & lowercases
function checkUserInput(input) {
    let lowerInput = input.toLowerCase()
    let validLetter = alphabet.includes(lowerInput)

    if (validLetter && !letters.includes(lowerInput)) {
        letters.push(lowerInput)
    } else if (validLetter && letters.includes(lowerInput)) {
        
    }

    if (validLetter && !currentFoodItem.toLowerCase().includes(lowerInput)) {
        $livesCount.innerHTML -= 1
    }
}

//Checks if the word is complete & allows a win without the space for multi word strings
function checkWinner(string, array) {
    for (let i = 0; i < string.length; i++) {
        if (string[i] === " ") continue
        if (!array.includes(string[i])) {
            return false
        }
    }
    return true
}

//Increases score for wins or losses
function checkGameStatus() {
    if ($livesCount.innerHTML === "0") {
        $losses.innerText = parseInt($losses.innerText) + 1
        // alert("Womp Womp, You Lose! Play Again!") 
        loseSound.play()
        startGame()
    }

    if (checkWinner(currentFoodItem, letters)) {
        $wins.innerText = parseInt($wins.innerText) + 1
        // alert("Woohoo, You Won!")
        winSound.play()
        startGame()
    }
}

//Updates the Hangman image
function changeImgDiv() {
    let image = document.getElementById("disneyImg");
    image.src = `assets/images/${$livesCount.innerText}.jpg`
}

//Checks user input to fade typed letters 
document.addEventListener("keyup", (event) => {

    let letterTyped = event.key
    let letterClass = $(`.${letterTyped}`)
    letterClass.css('opacity', '.3')

    checkUserInput(event.key)
    checkGameStatus()
    $word.innerText = hideString(currentFoodItem, letters)
    changeImgDiv()

})


//hide answer in console so people can't cheat
//will using .on('click) help load quicker?

