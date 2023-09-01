const myInformation = {

    firstName: "Tuan",

    lastName: "Nguyen",

    location: "Quincy, Massachusetts",

    buildThisGame: ["JavaScript", "CSS", "HTML"],

    getGreeting: function () {

        console.log(`Hello there, I'm ${this.firstName} ${this.lastName}Thank you for playing Simon.`)
    },
    connectWithMe: {

        git: "github.me",

        linke: "linkedin.me",

        gmail: "gmail.me",

    }

}

myInformation.getGreeting()
console.log(myInformation.connectWithMe.git);
