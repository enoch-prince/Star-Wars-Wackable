const holes = document.querySelectorAll(".hole");  // nodelist --> simplified array
const scoreboard = document.querySelector('.score');
const yodas = document.querySelectorAll(".yoda");
const countdown_board = document.querySelector('.countdown');
const start_button = document.querySelector('.startButton');

// game states
let last_hole;              // keeps track of the previous hole yoda popped out from
let time_up = false;        // checks if time is up 
let time_limit = 20000;     // in milliseconds --> 20 seconds
let score = 0;              // keeps track of our score
let countdown;


function  pickRandomHole(holes) {
    //const random_hole_index = Math.random() * (holes.length - 1);
    const random_hole_index = Math.floor(Math.random() * holes.length);  // round down the random index btn 0 - 5
    const hole = holes[random_hole_index];  // get the random hole

    if (hole === last_hole) {
        return pickRandomHole(holes);
    }

    last_hole = hole;  // keep track of the previous hole
    return hole;
}


function popOut(){
    const time = Math.random() * 1200 + 1200;  // random number between 1.2s and 2.4s
    const hole = pickRandomHole(holes); //TODO
    hole.classList.add('up');   //Programmatically adds a new class for the hole div called "up"

    setTimeout(function(){
        hole.classList.remove('up');
        if(!time_up) popOut();      // if time is not up, execute the popOut function again
    }, time);

}   


function startGame() {

    // step 1: Reset all game states
    countdown = time_limit / 1000;    // convert countdown from milliseconds to seconds
    score = 10;
    scoreboard.textContent = score;
    scoreboard.style.display = 'block'; //do this to make the scoreboard invinsible before the game starts
    countdown_board.textContent = countdown;
    time_up = false;

    // step 2: make Yoda pop out
    popOut();

    //  step 3: enable the countdown timer
    setTimeout(function(){
        time_up = true;
    }, time_limit);     //setTimeout executes the code in the funtion after the time_limit has elapsed

    // step 4: Do the actual countdown
    let startCountDown = setInterval( () => {
        countdown = countdown - 1;  // or // countdown -= 1;
        countdown_board.textContent = countdown;

        if(countdown < 0) {
            countdown = 0;
            clearInterval(startCountDown);  // this restarts the startCountdown interval
            countdown_board.textContent = "Time's UP!! Yoooo. May the force be with you 🍟";
        }
    }, 1000);   //setInterval executes the code in the arrow function every second
}   

// Bind the startGame function to the start button
start_button.addEventListener('click', startGame);


