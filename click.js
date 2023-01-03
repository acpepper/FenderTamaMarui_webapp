const button = document.querySelector('input');
const paragraph = document.querySelector('p');

audio = new Audio('throwOneUp.mp3');
testStarted = false;
t0 = null;
counter = 0;
let distanceTracker = [];
let absDistanceTracker = [];
let graphData = [];


function startTester() {
    t0 = new Date();
    testStarted = !testStarted;
    if (testStarted) {
        button.setAttribute('value', "Running ...");
        audio.play();
    }
    else {
        button.setAttribute('value', "stopped");
        audio.pause();
        audio.currentTime = 0;
        counter = 0;
    }
}

function warmup(){
    if (counter >= 10){
        audio.pause();
    }
}


function gridCheck() {
    counter += 1;
    downbeat = new Date();
    console.log(counter);
    distance = downbeat.getTime() - (t0.getTime() + (500 * counter));
    distanceTracker.push(distance);
    absDistance = downbeat.getTime();
    absDistanceTracker.push(absDistance);
}

// take last 20 and check accuracy
function calculation(){
    lastTen = distanceTracker.slice(-20);
    sum = 0;
    lastTwentyDistance = [];
    distanceSum = 0;
    for (let i = 1; i < 20; i++) {
        d = Math.abs(lastTen[i] - lastTen[i-1]);
        lastTwentyDistance.push(d);
        distanceSum += d;
    }
    mean = distanceSum / 20;
    standardDev = 0;
    for (let i = 0; i < 19; i++) {
        standardDev += Math.pow(lastTwentyDistance[i] - mean, 2);
    }
    lastTwentyAbs = absDistanceTracker.slice(-20);
    graphData.push(0);
    endingDistance = lastTwentyAbs[0] - lastTwentyAbs[19] + 9500; 
    standardDev = Math.sqrt(standardDev/20);
    console.log(lastTen);
    console.log(mean);
    console.log(standardDev);
    console.log(counter);
    console.log(endingDistance);
    console.log(graphData);
}


// measure distance of last beat 

document.addEventListener("keydown", (event) => {
    if ((event.isComposing || event.keyCode === 68) && testStarted) {
        if (counter >= 20) calculation();
        gridCheck();
        warmup();
    }
});
document.getElementById("testBtn").addEventListener("click", startTester);
