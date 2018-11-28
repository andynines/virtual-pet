/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Constants
var TICK = 1000; // Update delay (ms) resets if got input in meantime
var STATE_RETAIN = 0.6; // Chance to stay in current state (w/o intervention)

// Possible states
var states = [
    {
        name: "happy", // System name
        desc: "Gary is feeling happy.", // How it's described to user
        img: "gary-happy.jpeg", // Path to corresponding pic
        next: [
	    "bored",
            "read",
            "wheel"
        ]
    },
    {
        name: "bored",
        desc: "Gary is bored.",
        img: "gary-idle.png",
        next: [
	    "read",
            "sockeyes",
            "wheel",
            "happy"
        ]
    },
    {
        name: "sad",
        desc: "You've made Gary sad!",
        img: "gary-sad.png",
        next: [
	    // Needs user attention 
        ]
    },
    {
        name: "tired",
        desc: "Gary is a worn-out snail.",
        img: "gary-tired.png",
        next: [
	    // Needs user attention
        ]
    },
    {
        name: "hungry",
        desc: "Gary's stomach is growling...",
        img: "gary-hungry.png",
        next: [
	    // Needs user attention    
        ]
    },
    {
        name: "reading",
        desc: "Gary is catching up on his reading.",
        img: "special-reading.jpg",
        next: [
	    "happy",
            "bored",
        ]
    },
    {
        name: "sockeyes",
        desc: "Oops, Gary can't see!",
        img: "special-sockeyes.jpeg",
        next: [
	    "bored",
            "tired"
        ]
    },
    {
        name: "wheel",
        desc: "Gary is getting some exercise.",
        img: "special-wheel.png",
        next: [
	    "happy",
            "hungry",
            "tired"
        ]
    }
];

// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        effect: [ // List of possible states caused
            "happy"
        ]
    },
    {
        name: "walk",
        desc: "Go for walk",
        effect: [
    
        ]
    },
    {
        name: "feed",
        desc: "Feeding time",
        effect: [
    
        ]
    },
    {
        name: "treat",
        desc: "Give treat",
        effect: [
    
        ]
    },
    {
        name: "bathe",
        desc: "Bathtime",
        effect: [
    
        ]
    },
    {
        name: "sleep",
        desc: "Bedtime",
        effect: [
    
        ]
    }
];



// Housekeeping vars
var timer;

var currentState;
var totalStimuli;



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
    var stateElem;
    var descText;

    img = document.getElementById("img");
    out = document.getElementById("out");
    
    stateElem = getNamedElement(states, currentState); 
    descText = stateElem.desc;

    img.src = "assets/pet-pics/" + stateElem.img;
    img.alt = descText;
    out.innerHTML = descText;

}



function update() {

    // set new state

    draw();

    timer = window.setTimeout(update, TICK);

}



function doAction(actionName) {

    clearTimeout(timer);

    // logic

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

    currentState = "happy";
    totalStimuli = stimuli.length;

    buildInputs();
    draw();

    setTimeout(update, TICK);

}

