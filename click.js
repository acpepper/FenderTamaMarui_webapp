const button = document.querySelector('input');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);
cntr = 0
t_start = new Date()
t_end = null

function updateButton() {
    t_end = new Date()
    // console.log(time.diff(t_start, t_end))
    console.log(t_end - t_start)
    t_start = new Date
    cntr += 1
    console.log(cntr)
}
