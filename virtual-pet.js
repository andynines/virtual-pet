/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Constants
var TICK = 1000; // Update delay (ms) resets if got input in meantime

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
        name: "sad",
        desc: "You've made Gary sad!",
        img: "gary-sad.png",
        next: {

        }
    },
    {
        name: "tired",
        desc: "Gary is a worn-out snail.",
        img: "gary-tired.png",
        next: {

        }
    },
    {
        name: "hungry",
        desc: "Gary's stomach is growling...",
        img: "gary-hungry.png",
        next: {

        }
    },
    {
        name: "reading",
        desc: "Gary is catching up on his reading.",
        img: "special-reading.jpg",
        next: {

        }
    },
    {
        name: "sockeyes",
        desc: "Oops, Gary can't see!",
        img: "special-sockeyes.jpeg",
        next: {

        }
    },
    {
        name: "wheel",
        desc: "Gary is getting some exercise.",
        img: "special-wheel.png",
        next: {

        }
    }
];

// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        effect: { // List of possible states caused
            "happy"
        }
    },
    {
        name: "walk",
        desc: "Go for walk",
        effect: {
    
        }
    },
    {
        name: "feed",
        desc: "Feeding time",
        effect: {
        
        }
    },
    {
        name: "treat",
        desc: "Give treat",
        effect: {
        
        }
    },
    {
        name: "sleep",
        desc: "Bedtime",
        effect: {
        
        }
    },
    {
        name: "bathe",
        desc: "Bathtime",
        effect: {
        
        }
    }
];



// Housekeeping vars
var timer;

var stateIndex;
var totalStates;
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

    stateIndex = 0;
    totalStates = states.length;
    totalStimuli = stimuli.length;

    buildInputs();
    draw();

    setTimeout(update, TICK);

}

