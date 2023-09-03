const colors = ["green", "red", "yellow", "blue"]
const comSequence = [], playerSequence = []

function clickButton() {
    // Select the button by random color and add effect click button
    let pickColor = colors[Math.floor(Math.random() * 4)]
    comSequence.push(pickColor)
    buttColor = document.getElementById(pickColor)
    console.log(pickColor);
    console.log(`${pickColor}-active`);
    // Add active class to element and remove after 1 second
    buttColor.classList.add(`${pickColor}-active`)
    setTimeout(() => {
        buttColor.classList.remove(`${pickColor}-active`)
        console.log(comSequence);
    }, 200)
}

// let i = 10
// let randomInterVal = setInterval(() => {
//     clickButton()
//     i -= 1
//     if (i <= 0) {
//         clearInterval(randomInterVal)
//     }
// }, 1000)