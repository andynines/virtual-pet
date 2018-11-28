/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Constants

var TICK = 1500; // Update delay (ms) resets if got input in meantime
var STATE_RETAIN = 0.75; // Chance to stay in current state (w/o intervention)

// Possible states
var states = [
    {
        name: "happy", // System name
        desc: "Gary is feeling happy.", // How it's described to user
        img: "gary-happy.jpeg", // Path to corresponding pic
        next: [ // Possible states from this one
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
        ]
    },
    {
        name: "sad",
        desc: "You've made Gary sad!",
        img: "gary-sad.png",
        next: [
	    "bored"
        ]
    },
    {
        name: "tired",
        desc: "Gary is a worn-out snail.",
        img: "gary-tired.png",
        next: [
	    "bored"
        ]
    },
    {
        name: "hungry",
        desc: "Gary's stomach is growling...",
        img: "gary-hungry.png",
        next: [
	    "bored"
        ]
    },
    {
        name: "read",
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
    },
    {
        name: "eating",
        desc: "Gary feasts!",
        img: "gary-eating.png",
        next: [
            "happy",
            "bored",
            "read"
        ]
    },
    {
        name: "sleeping",
        desc: "Gary takes a cat nap.",
        img: "gary-sleeping.png",
        next: [
            "bored",
        ]
    },
    {
        name: "bath",
        desc: "But Gary doesn't like baths...",
        img: "gary-soap.jpg",
        next: [
            "sad"
        ]
    },
    {
        name: "treat",
        desc: "Those are Gary's favorite!",
        img: "gary-treat.jpeg",
        next: [
            "happy",
            "wheel"
        ]
    },
    {
        name: "walk",
        desc: "You go on a pleasant walk together.",
        img: "gary-walk.png",
        next: [
            "bored",
            "happy",
            "tired"
        ]
    }
];

// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        effects: [ // List of possible states caused
            "happy"
        ]
    },
    {
        name: "walk",
        desc: "Go for walk",
        effects: [
            "walk"
        ]
    },
    {
        name: "feed",
        desc: "Feed",
        effects: [
            "eating"
        ]
    },
    {
        name: "treat",
        desc: "Give treat",
        effects: [
            "treat"
        ]
    },
    {
        name: "bathe",
        desc: "Give bath",
        effects: [
            "bath" 
        ]
    },
    {
        name: "sleep",
        desc: "Send to bed",
        effects: [
            "sleeping"
        ]
    }
];



// Housekeeping vars

var idleTimer;

var currentState;
var totalStimuli;



// Utility methods

function getNamedElement(arr, name) {

    // Locate item with "name" property in array (states, stimuli)
    var elemIndex;
    var elem;

    for (elemIndex = 0; elemIndex < arr.length; ++elemIndex) {
        elem = arr[elemIndex];
        if (elem.name == name) {
            return elem;
        }
    }

    return false;

}



function chooseRandom(arr) {

    // Choose random item from array 
    var arrLen;
    var arrIndex;
    var choiceProb;

    arrLen = arr.length;

    for (arrIndex = 0; arrIndex < arrLen; ++arrIndex) {
        choiceProb = 1 / (arrLen - arrIndex);
        if (Math.random() <= choiceProb) {
            break;
        }
    }

    return arr[arrIndex];

}



// User interface

function draw() {
    
    // Sync webpage with pet status
    var img;
    var stateElem;
    var descText;

    img = document.getElementById("img");
    stateElem = getNamedElement(states, currentState); 
    descText = stateElem.desc;

    img.src = "assets/pet-pics/" + stateElem.img;
    img.alt = descText;
   
    document.getElementById("out").innerHTML = descText;

}



function idleUpdate() {

    // Automatic change of state due to lack of input
    var stateElem;

    stateElem = getNamedElement(states, currentState);

    if (stateElem.next.length > 0) {
        if (Math.random() >= STATE_RETAIN) {
            currentState = chooseRandom(stateElem.next);
        }
    }

    draw();

    idleTimer = setTimeout(idleUpdate, TICK);

}



function doAction(actionName) {

    // Respond to stimuli
    clearTimeout(idleTimer);

    var actionElem;

    actionElem = getNamedElement(stimuli, actionName);
    currentState = chooseRandom(actionElem.effects);

    draw();

    idleTimer = setTimeout(idleUpdate, TICK);

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

    setTimeout(idleUpdate, TICK);

}

