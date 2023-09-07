import * as gameSounds from "./sound.js"
/********************* Constant and Variable *********************/
const colors = ["green", "red", "yellow", "blue"]
let computerSequence = [], playerSequence = []
let level = 1, isGameOn = false, speedUp = 1, mode = "normal"

/********************* Document Element *********************/
const startGameEle = document.querySelector("#message-content")
//* Set the message content after select game mode
const navbarEle = document.querySelector(".navbar")
const gameButtons = document.querySelectorAll(".game-button")
const gameOptionMode = document.querySelectorAll(".game-option-mode")
const gameRuleEles = document.querySelectorAll(".gr-h1")
const gameRuleDecsEles = document.querySelectorAll(".gr-desc")

/********************* Event Listener *********************/
startGameEle.addEventListener("click", startGame)
navbarEle.addEventListener("click", handleNavbar)

gameButtons.forEach(button => {
    button.addEventListener("click", playerClick)
})

gameRuleEles.forEach((el, idx) => {
    el.addEventListener("click", () => {
        //Remove class show-content from gameRuleDecs
        document.querySelector(".gr-h1.gr-active").classList.remove("gr-active")
        //add gr-active class when clicking
        el.classList.add("gr-active")

        document.querySelector(".gr-desc.show-content").classList.remove("show-content")
        gameRuleDecsEles[idx].classList.add("show-content")
    })
})
/********************* Select Game Mode *********************/
gameOptionMode.forEach(option => option.addEventListener("click", selectMode))

/********************* Function *********************/


function selectMode(evt) {
    mode = evt.target.id
    if (mode === "hard") {
        startGameEle.textContent = "Test the sound, then click me to start"
        startGameEle.style.fontSize = "42px"
    } else {
        startGameEle.textContent = "Click me to start the game"
    }
    computerSequence = [], playerSequence = []
    level = 1, isGameOn = false, speedUp = 1
    startGameEle.addEventListener("click", startGame)
}

function startGame() {
    //* Click the message to run render
    startGameEle.removeEventListener("click", startGame)
    // Remove navbar background to help player can focus the game
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
        startGameEle.textContent = `level: ${level}`
        //The computerTurn will invoke based on mode
        if (mode === 'normal') {
            setTimeout(computerTurnNormalMode, 2000 / speedUp)
        } else if (mode === "hard") {
            setTimeout(computerTurnHardMode, 2000 / speedUp)
        }
    }
}

function playSounds(btnColor) {
    //* Play the button color corresponding button color
    if (btnColor === 'red') { gameSounds.red() }
    else if (btnColor === 'blue') { gameSounds.blue() }
    else if (btnColor === 'yellow') { gameSounds.yellow() }
    else if (btnColor === 'green') { gameSounds.green() }
}

function computerTurnNormalMode() {
    /*
    * Select the button by random colors then add to computerSequence
    * play sound effect, and add click button effect
    */
    let pickColor = colors[Math.floor(Math.random() * 4)]
    computerSequence.push(pickColor)
    //* play sound with corresponding color
    playSounds(pickColor)
    //* Add active class to element and remove after 1 second
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
    * Clicking the color button, then add to playerSequence, then compare to computerSequence
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
        // console.log(playerSequence);
        for (let i = 0; i < playerSequence.length; i++) {
            compare(playerSequence[i], computerSequence[i])
            // Go to nextRound if playerSequence and computerSequence are matching
            if (playerSequence.length === computerSequence.length) {
                compare(playerSequence[computerSequence.length - 1], computerSequence[computerSequence.length - 1])
                nextRound()
            } else break
        }
    } else if (!isGameOn) {
        deactivateButton()
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