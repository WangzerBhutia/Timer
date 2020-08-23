class Timer { 

    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);

        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
        }
    }
    
    start = () => {
        // Exception when input isn't a number
        if(isNaN(this.durationInput.value)){
        }
        else {
            if(this.onStart) {
                this.onStart();
            }
            this.tick();
            this.intervalID = setInterval(this.tick, 1000);
        }
       
    }

    tick = () => {
    
        if(this.timeRemaining <= 0) {
            this.pause();
            if(this.onComplete) {
                this.onComplete();
            } 
        }
        else {
            this.timeRemaining = this.timeRemaining - 1;
            if(this.onTick) {
                this.onTick();
            }
        }

    }

    pause = () => {
        clearInterval(this.intervalID);
    }

    // GET and SETTERS to retrieve
    // value from input DOM
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time;
    }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

// Adding callback functions for communicating
// event completion (i.e. Timer ends etc.) 
// with the outside world
const timer = new Timer(durationInput, startButton, pauseButton,{
        onStart(){
            console.log("Timer started");
        },
        onTick(){
            console.log("Tick");
        },
        onComplete(){
            console.log("Completed");
        }
    });
