/*
virtual-pet.js
Andrew Senin
Drexel CS164
*/



var stateIndex;
var totalStates;



var states = [
    {
        name: "bored",
        desc: "feeling bored",
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
        desc: "feeling happy",
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
        desc: "feeling tired",
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
        desc: "feeling hungry",
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
        desc: "feeling angry",
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
    
    descText = "Gary is " + currentState.desc;
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
    update();

}

