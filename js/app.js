import * as gameSounds from "./sound.js"
/********************* Constant and Variable *********************/
const colors = ["green", "red", "yellow", "blue"]

let computerSequence = [], playerSequence = []
let level = 1, isGameOn = false, speedUp = 1
/********************* Document Element *********************/
const startGameEle = document.querySelector("#message-content")
const navbarEle = document.querySelector(".navbar")
const gameButtons = document.querySelectorAll(".game-button")


/********************* Event Listener *********************/
startGameEle.addEventListener("click", startGame)
navbarEle.addEventListener("click", handleNavbar)

gameButtons.forEach(button => {
    button.addEventListener("click", playerClick)
})



function activeButton() {
    //* Active the button click effect when game is running
    gameButtons.forEach(button => {
        let color = button.getAttribute("id")
        button.classList.add(`${color}-click`)
    })
}

function deactivateButton() {
    //* Deactivate the button effect when game is not running
    gameButtons.forEach(button => {
        let color = button.getAttribute("id")
        button.classList.remove(`${color}-click`)
    })
}
/********************* Function *********************/

function startGame() {
    //* Click the message to run render

    //Deactivate click message to avoid reset game
    startGameEle.removeEventListener("click", startGame)
    //Change navbar background to help player focus to playing game
    navbarEle.classList.add("none-background")
    isGameOn = true
    // MAIN LOOP
    render()
}

function render() {
    if (isGameOn) {
        // Active the button for player
        activeButton()
        //Render the message based on current level
        startGameEle.textContent = `Level: ${level}`
        setTimeout(computerTurn, 2000 / speedUp)
    }
}

function computerTurn() {
    /*
    * Select the button by random colors then add to computerSequence
    * play sound effect, and add click button effect
    */
    let pickColor = colors[Math.floor(Math.random() * 4)]
    computerSequence.push(pickColor)
    //* play sound with corresponding color
    if (pickColor === 'red') { gameSounds.red() }
    else if (pickColor === 'blue') { gameSounds.blue() }
    else if (pickColor === 'yellow') { gameSounds.yellow() }
    else if (pickColor === 'green') { gameSounds.green() }
    //* Add active class to element and remove after 1 second
    let buttColor = document.getElementById(pickColor)
    buttColor.classList.add(`${pickColor}-active`)
    setTimeout(() => {
        buttColor.classList.remove(`${pickColor}-active`)
    }, 200 / speedUp)
    console.log(computerSequence);
}

function playerClick(evt) {
    /*
    * Clicking the color button, then add to playerSequence, then compare to computerSequence
    */
    if (isGameOn) {
        playerSequence.push(evt.target.id)
        // console.log(playerSequence);
        for (let i = 0; i < playerSequence.length; i++) {
            compare(playerSequence[i], computerSequence[i])
            // Go to nextRound if playerSequence and computerSequence are matching
            if (playerSequence.length === computerSequence.length) {
                nextRound()
            }
        }
    }
}



function compare(computer, player) {
    //* game over if player doest match with computer sequence, continue next index otherwise
    if (computer != player) {
        gameOver()
    } else return
}



function nextRound() {
    /*
    * Increase level, and re-render the main loop
    * After 5 levelup, increase speed. It mean the time for the computer click the button and the time between each round will be faster 
    */
    level++
    playerSequence = []
    if (level % 5 === 0) {
        speedUp++
        setTimeout(render, 2000)
        gameSounds.next5Level()
    } else {
        gameSounds.nextRound()
        setTimeout(render, 100)
    }
}

function gameOver() {
    /*
    * Play the game Over sound, render new message
    * Re-active: clicking on the message to reset the game
    * Deactivate clicking the button before reset game
    * Set isGameOn = false to stop the render()
    * Reset all variable to default for new game
    */
    gameSounds.gameOver()
    deactivateButton()
    startGameEle.innerHTML = `Game Over`
    let pEle = document.createElement("p")
    pEle.textContent = "Click me to reset"
    startGameEle.appendChild(pEle)
    startGameEle.addEventListener("click", startGame)
    isGameOn = false
    //------------
    level = 0
    speedUp = 1
    computerSequence = []
    playerSequence = []

}

function handleNavbar() {
    //* Remove the color navbar background
    navbarEle.classList.remove("none-background")
}
