/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Housekeeping vars
var stateIndex;
var totalStates;

// Pet vars
var happiness;
var hunger;
var fatigue;



// Possible states
var states = [
    {
        name: "bored",
        desc: "Gary is bored",
        img: "gary-idle.png",
        next: {
            "happy": 20,
            "tired": 20,
            "hungry": 20,
            "angry": 20
        }
    },
    {
        name: "happy",
        desc: "Gary is feeling happy",
        img: "gary-happy.jpeg",
        next: {
            "bored": 20,
            "tired": 20,
            "hungry": 20,
            "angry": 20
        }
    },
    {
        name: "tired",
        desc: "Gary is worn out",
        img: "gary-tired.png",
        next: {
            "happy": 20,
            "bored": 20,
            "hungry": 20,
            "angry": 20
        }
    },
    {
        name: "hungry",
        desc: "Gary's stomach is growling",
        img: "gary-hungry.png",
        next: {
            "happy": 20,
            "bored": 20,
            "tired": 20,
            "angry": 20
        }
    },
    {
        name: "angry",
        desc: "Gary is seething with rage!",
        img: "gary-angry.png",
        next: {
            "happy": 20,
            "bored": 20,
            "tired": 20,
            "hungry": 20,
        }
    }
];



function update() {

    var img;
    var out;
    var currentState;
    var descText;

    img = document.getElementById("img");
    out = document.getElementById("out");
    
    currentState = states[stateIndex]; 
    descText = currentState.desc;

    img.src = "assets/pet-pics/" + currentState.img;
    img.alt = descText;
    out.innerHTML = descText;

}



function cycle() {

    stateIndex = (stateIndex + 1) % totalStates;
    update();

}



function init() {

    stateIndex = 0;
    totalStates = states.length;

    happiness = 100;
    hunger = 100;
    fatigue = 100;

    update();

}

