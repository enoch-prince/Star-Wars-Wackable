// holes variable holds a ref of all hole elements
const holes = document.querySelectorAll(".hole"); // creates a nodelist --> simplified array
const score_board = document.querySelector('.score');
const moles =document.querySelectorAll(".mole");
const countdown_board = document.querySelector(".countdown");
const start_button = document.querySelector(".startButton");


let last_hole;
let time_up = false;
let time_limit = 20000;
let score = 0;
let countdown;

function pickRandomHole(holes) {
    const random_hole_index = Math.floor(Math.random() * holes.length); // round the number down
    const hole = holes[random_hole_index];
    if (hole === last_hole) {
        return pickRandomHole(holes);
    }
    last_hole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 1200 + 1200; // the amount of time the mole wil spend popped out
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!time_up) popOut();
    }, time);
}

function startGame(){
    countdown = time_limit / 1000;
    score_board.textContent = 0;
    score_board.style.display = 'block';  // when we want the score to be invisible before wqe start the game
    countdown_board.textContent = countdown;
    time_up = false;
    score = 0;
    popOut();
    setTimeout(function(){
        time_up = true;
    }, time_limit);

    let startCountdown = setInterval(() => {
        countdown -= 1;
        countdown_board.textContent = countdown;
        if(countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            countdown_board.textContent = "Time's UP!! Thank you for\
            protecting out planet! This is the way!";
        }
    }, 1000);
}

start_button.addEventListener("click", startGame);

function whack(e){
    score++;
    this.style.backgroundImage = 'url("imgs/yoda2.png")';
    this.style.pointerEvents = "none";
    setTimeout(() => {
        this.style.backgroundImage = 'url("imgs/yoda1.png")';
        this.style.pointerEvents = "all";
    }, 800);
    score_board.textContent = score;
}

moles.forEach(mole => {
    mole.addEventListener('click', whack);
});