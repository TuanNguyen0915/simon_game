import * as gameSounds from "./sound.js"
/********************* Constant and Variable *********************/
const colors = ["green", "red", "yellow", "blue"]
let computerSequence = [], playerSequence = []
let level = 1, isGameOn = false, speedUp = 1, mode = "normal"

/********************* Cached Element References *********************/
const startGameEle = document.querySelector("#message-content")
const navbarEle = document.querySelector(".navbar")
const gameButtons = document.querySelectorAll(".game-button")
const gameOptionMode = document.querySelectorAll(".game-option-mode")
const gameRuleEles = document.querySelectorAll(".gr-h1")
const gameRuleDecsEles = document.querySelectorAll(".gr-desc")

/********************* Event Listeners *********************/
startGameEle.addEventListener("click", startGame)
navbarEle.addEventListener("click", handleNavbar)

gameButtons.forEach(button => {
    button.addEventListener("click", playerClick)
})

gameRuleEles.forEach((el, idx) => {
    /*
        * Remove class show-content from gameRuleDecs and gr-desc
        * Add gr-active class and show-content when clicking
    */
    el.addEventListener("click", () => {
        document.querySelector(".gr-h1.gr-active").classList.remove("gr-active")
        el.classList.add("gr-active")
        document.querySelector(".gr-desc.show-content").classList.remove("show-content")
        gameRuleDecsEles[idx].classList.add("show-content")
    })
})

/********************* Select Game Mode *********************/
gameOptionMode.forEach(option => option.addEventListener("click", (evt) => {
    /*
        * Choose the game mode and play with the corresponding mode
        * Change the message based on game mode
        * While playing, player can choose game mode and reset all variables to default like reset game
    */
    mode = evt.target.id
    startGameEle.textContent = mode === "hard" ? "Test the sound, then click me to start" : "Click me to start the game"
    computerSequence = [], playerSequence = []
    level = 1, isGameOn = false, speedUp = 1
    startGameEle.addEventListener("click", startGame)
}))

/********************* Function *********************/

function startGame() {
    /*
        * Click the message to run render, then remove the eventlistener to avoid mistake
        * Remove navbar background to help player can focus the game
        * render game
    */
    startGameEle.removeEventListener("click", startGame)
    navbarEle.classList.add("none-background")
    isGameOn = true
    render()
}

function render() {
    /*
        * Render the message based on the current level
        * The computerTurn will invoke based on mode
    */
    if (isGameOn) {
        activeButton()
        startGameEle.textContent = `level: ${level}`
        if (mode === 'normal') {
            setTimeout(computerTurnNormalMode, 2000 / speedUp)
        } else if (mode === "hard") {
            setTimeout(computerTurnHardMode, 2000 / speedUp)
        }
    }
}


function computerTurnNormalMode() {
    /*
    * Select the button by random colors then add to computerSequence
    * play sound effect, and add click button effect based on color button
    * Add active class to element and remove to make flashing effect
    */
    let pickColor = colors[Math.floor(Math.random() * 4)]
    computerSequence.push(pickColor)

    playSounds(pickColor)
    let buttColor = document.getElementById(pickColor)

    buttColor.classList.add(`${pickColor}-active`)
    setTimeout(() => {
        buttColor.classList.remove(`${pickColor}-active`)
    }, 200 / speedUp)
}

function computerTurnHardMode() {
    /*
    * Working the same with normal mode, but buttons don't have flashing effect
    */
    let pickColor = colors[Math.floor(Math.random() * 4)]
    computerSequence.push(pickColor)
    playSounds(pickColor)
}

function playerClick(evt) {
    /*
    * Clicking the color button, then add to playerSequence, then compare to computerSequence after click
    * With game mode = hard, player can test the sound effect, then click to message to play game
    */
    if (!isGameOn && mode === 'hard') {
        let pickColor = evt.target.id
        playSounds(pickColor)
        let buttColor = document.getElementById(pickColor)
        buttColor.classList.add(`${pickColor}-active`)
        setTimeout(() => {
            buttColor.classList.remove(`${pickColor}-active`)
        }, 200 / speedUp)
    }
    else if (isGameOn) {
        playerSequence.push(evt.target.id)
        let lastIdx = playerSequence.length - 1
        compare(computerSequence[lastIdx], playerSequence[lastIdx])
        // Go to nextRound if playerSequence and computerSequence are matching
        if (playerSequence.length === computerSequence.length) nextRound()
    }
    else if (!isGameOn) deactivateButton()
}


function compare(computer, player) {
    if (player != computer) gameOver()
    return
}

function playSounds(btnColor) {
    //* Play the button color corresponding button color
    if (btnColor === 'red') gameSounds.red()
    else if (btnColor === 'blue') gameSounds.blue()
    else if (btnColor === 'yellow') gameSounds.yellow()
    else if (btnColor === 'green') gameSounds.green()
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
        setTimeout(render, 1000)
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
    startGameEle.textContent = "Game Over. Click me to reset"
    startGameEle.addEventListener("click", startGame)
    isGameOn = false
    //Reset all variables to default
    level = 0
    speedUp = 1
    computerSequence = []
    playerSequence = []
}

function handleNavbar() {
    //* Remove the color navbar background
    navbarEle.classList.remove("none-background")
}

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
