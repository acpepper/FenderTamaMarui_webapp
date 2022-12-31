const button = document.querySelector('input');
const paragraph = document.querySelector('p');

audio = new Audio('throwOneUp.mp3');
testStarted = false;
t0 = null;
counter = 0;
let distanceTracker = [];

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

function gridCheck() {
    counter += 1;
    downbeat = new Date();
    console.log(counter);
    distance = downbeat.getTime() - (t0.getTime() + (500 * counter));
    distanceTracker.push(distance);
}

// take last 10 and check accuracy
function calculation(){
    lastTen = distanceTracker.slice(-10);
    sum = 0;
    lastTenDistance = [];
    distanceSum = 0;
    for (let i = 1; i < 10; i++) {
        d = Math.abs(lastTen[i] - lastTen[i-1]);
        lastTenDistance.push(d);
        distanceSum += d;
    }
    mean = distanceSum / 10;
    standardDev = 0;
    for (let i = 0; i < 9; i++) {
        standardDev += Math.pow(lastTenDistance[i] - mean, 2);
    }
    standardDev = Math.sqrt(standardDev/10);
    console.log(lastTen)
    console.log(mean);
    console.log(standardDev);
    console.log(counter);
}

document.addEventListener("keydown", (event) => {
    if ((event.isComposing || event.keyCode === 68) && testStarted) {
        if (counter >= 10) calculation();
        gridCheck();
    }
});
document.getElementById("testBtn").addEventListener("click", startTester);
