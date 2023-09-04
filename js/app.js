/********************* Constant *********************/
const colors = ["green", "red", "yellow", "blue"]

let computerSequence = [], playerSequence = []
let level = 1, isGameOn = false
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
    gameButtons.forEach(button => {
        let color = button.getAttribute("id")
        button.classList.add(`${color}-click`)
    })
}

function deactivateButton() {
    gameButtons.forEach(button => {
        let color = button.getAttribute("id")
        button.classList.remove(`${color}-click`)
    })
}
/********************* Function *********************/

function startGame() {
    startGameEle.removeEventListener("click", startGame)
    //Change textContent based on current level, change font color and navbar background to help player focus to playing game
    // startGameEle.style.color = "#00afb9"
    navbarEle.classList.add("none-background")
    // startGameEle.textContent = `Level: ${level}`
    isGameOn = true
    // MAIN LOOP
    render()
}

function render() {
    if (isGameOn) {
        activeButton()
        startGameEle.textContent = `Level: ${level}`
        setTimeout(computerTurn, 2000)
    }
}

function playerClick(evt) {
    if (isGameOn) {
        playerSequence.push(evt.target.id)
        // console.log(playerSequence);
        for (let i = 0; i < playerSequence.length; i++) {
            compare(playerSequence[i], computerSequence[i])
            if (playerSequence.length === computerSequence.length) {
                nextRound()
            }
        }
    }
}



function compare(computer, player) {
    if (computer != player) {
        gameOver()
    } else return
}


function computerTurn() {
    // Select the button by random color and add effect click button
    let pickColor = colors[Math.floor(Math.random() * 4)]
    computerSequence.push(pickColor)
    buttColor = document.getElementById(pickColor)
    // Add active class to element and remove after 1 second
    buttColor.classList.add(`${pickColor}-active`)
    setTimeout(() => {
        buttColor.classList.remove(`${pickColor}-active`)
    }, 200)
    console.log(computerSequence);
}

function nextRound() {
    level++
    playerSequence = []
    render()
}

function gameOver() {
    deactivateButton()
    startGameEle.innerHTML = `Game Over`
    let pEle = document.createElement("p")
    pEle.textContent = "Click me to reset"
    startGameEle.appendChild(pEle)
    startGameEle.addEventListener("click", startGame)
    isGameOn = false
    //------------
    level = 0
    computerSequence = []
    playerSequence = []

}

function handleNavbar() {
    navbarEle.classList.remove("none-background")
}
