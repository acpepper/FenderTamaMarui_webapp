const button = document.querySelector('input');
const paragraph = document.querySelector('p');

document.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 32) {
        calculation();
        gridCheck();
        counterIncrement();
    }
});
// button.addEventListener('click', updateButton);
cntr = 0
t_start = new Date()
t_end = null
var audio = new Audio('throwOneUp.mp3');
let btnValue = 0
counter = 0;
let distanceTracker = [];


// first button sets initial time
function grid(){
    t0 = new Date();
}
grid();


function counterIncrement(){
    counter = counter + 1
}


function gridCheck() {
    downbeat = new Date();
    console.log(counter);
    distance = downbeat.getTime() - (t0.getTime() + (500 * counter));
    console.log(counter)
    console.log(distance);
    distanceTracker.push(distance);
    console.log(distanceTracker);
    if (counter = 1){
        audio.play()
    }
    else if (counter >= 10){
        audio.pause()
    }
}

// take last 10 and check accuracy
function calculation(){
    lastTen = distanceTracker.slice(-10);
    console.log(lastTen);
    sum = 0;
    lastTenDistance = [];
    distanceSum = 0;
    for (let i = 1; i < 10; i++){
        d = lastTen[i] - lastTen[i-1];
        lastTenDistance.push(d);
        distanceSum += d;
    }
    mean = distanceSum / 10;
    standardDev = distanceSum;
    console.log(mean);
    console.log(standardDev);  
}

// function updateButton() {
//     t_end = new Date();
//     // console.log(time.diff(t_start, t_end))
//     console.log(t_end - t_start);
//     btnValue = t_end - t_start;
//     t_start = new Date;
//     cntr += 1;
//     console.log(cntr);
//     button.setAttribute('value', btnValue);
// }
