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
let foodBank = ["dole whip", "dipping dots", "corn dog", "fried oreos", "curly fries", "hamburger", "ice cream sundae", "milkshake", "chicken tenders", "churros", "turkey leg", "candy apple", "beignets", "mac n cheese"]
let currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

let letters = []
let $newGameButton = document.getElementById('newGameButton')
let $gamePage = document.getElementById('gamePage')
let $introPage = document.getElementById('introPage')
let $resetButton = document.getElementById('resetButton')


//hide the intro page when new game button is pressed
$(document).ready(function () {
    $("#newGameButton").click(function () {
        $(".introPage").addClass("disappear")
        $(".gamePage").removeClass("disappear") 
    })
})

// start game
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

    // foodBank.splice(foodBank.indexOf(currentFoodItem), 1)
    //not using splice because game breaks with no words left in array

}

// on click enter game page button
$newGameButton.addEventListener('click', () => {
    startGame()
    let audio = new Audio("assets/audio/jiminycricket.mp3")
    audio.play()
})

//on click reset game button
$resetButton.addEventListener('click', () => {
    $wins.innerText = 0
    $losses.innerText = 0
    $livesCount.innerText = 8

    startGame()
})

//turns the random word into a _ string
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

//checks if input is part of alphabet & lowercases
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

//checks if the word is complete & allows a win without the space for multi word strings
function checkWinner(string, array) {
    for (let i = 0; i < string.length; i++) {
        if (string[i] === " ") continue
        if (!array.includes(string[i])) {
            return false
        }
    }
    return true
}

//increases score for wins or losses
function checkGameStatus() {
    if ($livesCount.innerHTML === "0") {
        $losses.innerText = parseInt($losses.innerText) + 1
        // alert("Womp Womp, You Lose! Play Again!") 
        startGame()
    }

    if (checkWinner(currentFoodItem, letters)) {
        $wins.innerText = parseInt($wins.innerText) + 1
        // alert("Woohoo, You Won!")
        startGame()
    }
}

//updates the 'hangman' image
function changeImgDiv() {
    let image = document.getElementById("disneyImg");
    image.src = `assets/images/${$livesCount.innerText}.jpg`
}

//checks user input to fade typed letters 
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
//need to add win and lose stuff (maybe a cheers sound?)
//will using .on('click) help load quicker?

