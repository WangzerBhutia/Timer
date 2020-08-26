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
                this.onStart(this.timeRemaining);
            }
            // To stop spamming of the start button
            if(this.intervalID) {
                console.log(this.intervalID)
                this.pause();
            }
            this.tick();
            this.intervalID = setInterval(this.tick, 20);
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
            this.timeRemaining = this.timeRemaining - 0.02;
            if(this.onTick) {
                this.onTick(this.timeRemaining);
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
        this.durationInput.value = time.toFixed(2);
    }
} 