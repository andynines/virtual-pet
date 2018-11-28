/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Constants
var MAX_HAPPINESS = 300;
var MAX_HUNGER = 300;
var MAX_FATIGUE = 300;

var DEC_HAPPINESS = 1;
var DEC_HUNGER = 3;
var DEC_FATIGUE = 2;

var TICK = 1000; // Update delay (ms) resets if got input in meantime

// Housekeeping vars
var timer;

var stateIndex;
var totalStates;
var totalStimuli;

// Vital vars
var happiness;
var hunger;
var fatigue;



// Possible states
var states = [
    {
        name: "happy", // System name
        desc: "Gary is feeling happy.", // How it's described to user
        img: "gary-happy.jpeg", // Path to corresponding pic
        next: {
	        
        }
    },
    {
        name: "bored",
        desc: "Gary is bored.",
        img: "gary-idle.png",
        next: {

        }
    },
    {
        name: "tired",
        desc: "Gary is a worn-out snail.",
        img: "gary-tired.png"
    },
    {
        name: "hungry",
        desc: "Gary's stomach is growling...",
        img: "gary-hungry.png"
    },
    {
        name: "reading",
        desc: "Gary is catching up on his reading.",
        img: "special-reading.jpg"
    },
    {
        name: "sockeyes",
        desc: "Oops, Gary can't see!",
        img: "special-sockeyes.jpeg"
    },
    {
        name: "wheel",
        desc: "Gary is getting some exercise.",
        img: "special-wheel.png"
    }
];



// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        effect: { // List of changes made to vital stats
            deltaHappiness: 15
        }
    },
    {
        name: "walk",
        desc: "Go for walk",
        effect: {
            deltaHappiness: 35,
            deltaFatigue: -15,
        }
    },
    {
        name: "feed",
        desc: "Feeding time",
        effect: {
            deltaHappiness: 10,
            deltaHunger: 40
        }
    },
    {
        name: "treat",
        desc: "Give treat",
        effect: {
            deltaHappiness: 15,
            deltaHunger: 10
        }
    },
    {
        name: "sleep",
        desc: "Bedtime",
        effect: {
            deltaHappiness: 5,
            deltaFatigue: 70
        }
    },
    {
        name: "bathe",
        desc: "Bathtime",
        effect: {
            deltaHappiness: -40
        }
    }
];



function getNamedElement(list, name) {

    // Locate item with "name" property in list (states, stimuli)
    var elemIndex;
    var elem;

    for (elemIndex = 0; elemIndex < list.length; ++elemIndex) {
        elem = list[elemIndex];
        if (elem.name == name) {
            return elem;
        }
    }

    return false;

}



function draw() {
    
    // Sync webpage with pet status
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

    // Debug
    console.log(
        "hap " + happiness.toString() +
        "\nhun " + hunger.toString() +
        "\nfat " + fatigue.toString()
    );

}



function update() {

    happiness = Math.min(MAX_HAPPINESS, Math.max(0, happiness - DEC_HAPPINESS));
    hunger = Math.min(MAX_HUNGER, Math.max(0, hunger - DEC_HUNGER));
    fatigue = Math.min(MAX_FATIGUE, Math.max(0, fatigue - DEC_FATIGUE));

    // set new state

    draw();

    timer = window.setTimeout(update, TICK);

}



function doAction(actionName) {

    clearTimeout(timer);

    var fx;
    var vitalDeltas;
    var deltaIndex;

    fx = getNamedElement(stimuli, actionName).effect;

    happiness += (fx.deltaHappiness != undefined)? fx.deltaHappiness : 0;
    hunger += (fx.deltaHunger != undefined)? fx.deltaHunger : 0;
    fatigue += (fx.deltaFatigue != undefined)? fx.deltaFatigue : 0;

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

    happiness = MAX_HAPPINESS;
    hunger = MAX_HUNGER;
    fatigue = MAX_FATIGUE;

    buildInputs();
    draw();

    setTimeout(update, TICK);

}

