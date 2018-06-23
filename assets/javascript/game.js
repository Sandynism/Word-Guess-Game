let gamePlay = false;
// SETTINGS
let $word = document.getElementById('placeholders')
let $lettersGuessed = document.getElementById('lettersGuessed')
let $livesCount = document.getElementById('livesCount')

let $wins = document.getElementById('wins')
$wins.innerText = 0
let $losses = document.getElementById('losses')
$losses.innerText = 0

let foodBank = ["dole whip", "dipping dots", "corn dog", "fried oreos", "cheese fries", "slushie", "chicken tenders", "churros", "turkey leg", "candy apple", "beignets", "mac n cheese"]
let currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

let letters = []
let $newGameButton = document.getElementById('newGameButton')


$newGameButton.addEventListener('click', () => {
    letters = [];
    currentFoodItem = foodBank[Math.floor(Math.random() * foodBank.length)];

    $livesCount.innerText = 8
    $word.innerText = hideString(currentFoodItem, letters)
    $lettersGuessed.innerText = ""
    
})

function hideString(currentFoodItem, array) {
    let finalWord = ""
    for (let i = 0; i < currentFoodItem.length; i++) {
        if (array.includes(currentFoodItem[i])) {
            finalWord += currentFoodItem[i]
        } else {
            finalWord += "#"
        }
    }
    return finalWord
}

function checkUserInput(input) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    let lowerInput = input.toLowerCase()
    
    if (alphabet.includes(lowerInput) && !letters.includes(lowerInput)) {
      letters.push(input)
    } 
}


document.addEventListener("keyup", (event) => {
    checkUserInput(event.key)
    $word.innerText = hideString(currentFoodItem, letters)

    $lettersGuessed.innerText = letters.join(", ")

    $livesCount.innerHTML -= 1

    $wins.innerText = parseInt($wins.innerText) + 1

    $losses.innerText = parseInt($losses.innerText) + 1 

})

function endGame()



