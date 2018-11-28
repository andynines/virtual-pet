/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



// Constants

var TICK = 1500; // Update delay (ms) resets if got input in meantime
var STATE_RETAIN = 0.7; // Chance to stay in current state (w/o intervention)

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
        desc: "Gary is sad about something!",
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
    }
];

// Available user inputs
var stimuli = [
    {
        name: "pet", // System name
        desc: "Pet", // Action available to user
        log: "Pet Gary", // Statement that appears in log line
        effects: [ // List of possible states caused
            "happy"
        ]
    },
    {
        name: "walk",
        desc: "Go for walk",
        log: "Took Gary for a walk",
        effects: [
            "happy",
            "hungry",
            "tired"
        ]
    },
    {
        name: "feed",
        desc: "Feed",
        log: "Fed Gary",
        effects: [
            "happy",
            "bored"
        ]
    },
    {
        name: "treat",
        desc: "Give treat",
        log: "Gave Gary a treat",
        effects: [
            "happy",
            "hungry"
        ]
    },
    {
        name: "bathe",
        desc: "Give bath",
        log: "Gave Gary a bath",
        effects: [
            "sad" 
        ]
    },
    {
        name: "sleep",
        desc: "Send to bed",
        log: "Sent Gary to bed",
        effects: [
            "bored",
            "read"
        ]
    }
];



// Housekeeping vars

var timer;

var currentState;
var totalStimuli;
var logText;
var tick;



// Utility methods

function getNamedElement(arr, name) {

    // Locate item with "name" property in arr (states, stimuli)
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
    document.getElementById("log").innerHTML = logText;

}



function update() {

    var stateElem;

    stateElem = getNamedElement(states, currentState);

    if (stateElem.next.length > 0) {
        if (Math.random() >= STATE_RETAIN) {
            currentState = chooseRandom(stateElem.next);
        }
    }

    tick = (tick + 1) % Number.MAX_SAFE_INTEGER;

    draw();

    timer = window.setTimeout(update, TICK);

}



function doAction(actionName) {

    clearTimeout(timer);

    var actionElem;

    actionElem = getNamedElement(stimuli, actionName);
    currentState = chooseRandom(actionElem.effects);
    logText = actionElem.log + " @T" + tick.toString();

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
    logText = "";
    tick = 0;

    buildInputs();
    draw();

    setTimeout(update, TICK);

}

