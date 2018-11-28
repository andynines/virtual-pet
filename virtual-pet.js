/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Housekeeping vars
var stateIndex;
var totalStates;
var totalStimuli;

// Pet vars
var happiness;
var hunger;
var fatigue;



// Possible states
var states = [
    {
        name: "bored", // System name
        desc: "Gary is bored", // How it's described to user
        img: "gary-idle.png", // Path to corresponding pic
        next: { // List of relative probabilities to change state
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



// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        effect: { // List of changes made to vital stats
            deltaHappiness: 35
        }
    },
    {
        name: "feed",
        desc: "Feed",
        effect: {
            deltaHappiness: 10,
            deltaHunger: 40
        }
    },
    {
        name: "sleep",
        desc: "Send to bed",
        effect: {
            deltaHappiness: 5,
            deltaFatigue: 70
        }
    },
    {
        name: "poke",
        desc: "Poke",
        effect: {
            deltaHappiness: -40,
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

    /* TODO:
    Decrement vital stats, and keep them in range
    */

}



function doAction(action) {

    update();

}



function buildInputs() {
    // Create buttons corresponding to each available action
    var inputDiv;
    var stimIndex;

    inputDiv = document.getElementById("inputs");

    for (stimIndex = 0; stimIndex < totalStimuli; ++stimIndex) {
        inputDiv.innerHTML += 
            "<input type=\"button\" \
            value=\"" + stimuli[stimIndex].desc + "\" \
            onclick=\"doAction('" + stimuli[stimIndex].name + "')\">";
    }
}



function init() {

    stateIndex = 0;
    totalStates = states.length;
    totalStimuli = stimuli.length;

    happiness = 100;
    hunger = 100;
    fatigue = 100;

    buildInputs();
    update();

}

