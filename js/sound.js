function red() {
    let audio = new Audio("../assets/sounds/red.mp3")
    // audio.volume = .5
    audio.play()
}

function blue() {
    let audio = new Audio("../assets/sounds/blue.wav")
    // audio.volume = .5
    audio.play()
}

function yellow() {
    let audio = new Audio("../assets/sounds/yellow.mp3")
    // audio.volume = .5
    audio.play()
}

function green() {
    let audio = new Audio("../assets/sounds/green.wav")
    audio.volume = .5
    audio.play()
}

function next5Level() {
    let audio = new Audio("../assets/sounds/next-level.mp3")
    audio.volume = .5
    audio.play()
}

function nextRound() {
    let audio = new Audio("../assets/sounds/success.mp3")
    audio.volume = .5
    audio.play()
}

function gameOver() {
    let audio = new Audio("../assets/sounds/game-over.wav")
    audio.volume = .5
    audio.play()
}

export { red, blue, yellow, green, next5Level, nextRound, gameOver };