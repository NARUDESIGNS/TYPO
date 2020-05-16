
const game = {
    //DOM elements    
    introPage : document.getElementById('intro-view'),    
    start : document.getElementById('start-button'),

    setupPage : document.getElementById('setup-view'),
    highScore : document.getElementById('high-score'),
    difficulty : document.getElementById('difficulty'),
    difficultySelection : document.getElementById('difficulty-selection'),
    difficultySelectionContainer : document.getElementById('difficulty-levels-container'),
    newbieBtn : document.getElementById('newbie'),
    masterBtn : document.getElementById('master'),
    proBtn : document.getElementById('pro'),
    play : document.getElementById('play-button'),

    gamePage : document.getElementById('game-view'),
    score : document.getElementById('score'),
    pause : document.getElementById('pause'),
    timeLimit : document.getElementById('game-time'),
    timeLimitContainer : document.getElementById('time-limit-container'),
    gameText : document.getElementById('game-text'),
    userInput : document.getElementById('game-input'),
    successTone : document.getElementById('success-sound'),
    errorTone : document.getElementById('error-sound'),

    dimBackground : document.getElementById('dim'),
    gamePaused : document.getElementById('game-paused'),
    pausedScore : document.getElementById('paused-score'),
    resume : document.getElementById('resume'),

    gameOver : document.getElementById('game-over'),
    gameOverScore : document.getElementById('game-over-score'),
    newHighScore : document.getElementById('new-high-score'),
    playAgain : document.getElementById('play-again'),

    newbiePts : 5/5, //5s for 5 words
    masterPts : 3/5, //3s for 5 words
    proPts : 2/5, //2s for 5 words

    timerStarted : false,
    
    saveHighScore() {
        localStorage.setItem('getHighScore', (this.highScore.innerText));
    },

    //retrieve highscore from memory if it exists
    getHighScore(){
        if(localStorage.getHighScore) this.highScore.innerText = localStorage.getItem('getHighScore');
    },

    text : [
        'Relocation', 'Emergencies', 'Interrogation', 'Delusional', 'Inadequate', 'propellant', 'underestimated', 'reconciliation', 'Bias', 'pagination',
        'reach for your soul', 'search the drawers now', 'if you love it, take it', 'Don\'t take what belongs to someone else', 'reach for the skies, now is the time',
        'Naru is working 100% to reach his goals', 'rest in peace Kobe Bryant', 'If you\'re here, then who\'s running heaven?', 'I prefer shorter girls, I like to wrap them in my arms', 'God save us all from COVID19',
        'NOT everyone believes in your abilities, note that', 'nothing', 'If you don\'t see me by 5, then i\'m probably not coming today', 'make 3 wishes now, use your magic wand and it\'d come to pass', 'long texts sucks, i know',
        'if 10 * 10 is 100, what is 11 * 5000?', 'Don\'t run away from it, it\'s who you are!', 'I just want to know, do you like me? never mind', 'I took time to make this, I hope it\'s worth it though', '5281 people suffered from it, but they\'re all really fine now',
        'A girl is no one', 'I am the three eyed raven', 'I prefer iphone to other mobile devices, don\'t ask me why', 'A lannister always pays his debt', 'things we do for love', 'Tell him to come bend the knee and i\'d spare everyone of them', 'Kings Landing', 'High garden',
        'All hail the mother of Dragons', 'I give you my word, I am true to my word as always', 'Many have tried, none has defeated them in an open field', 'That which is dead may never die', 'A wise man once said...', 'winter is coming', 'Tokyo and Nairobi are my favorites, how about you?',
        'God loves me, i\'m so sure about it', 'What would you do if you won 10million Dollars?', 'I hope to be super good in programming in the nearest years', 'I don\'t tweet a lot, but I find wellpaidgeek interesting', 'follow me on twitter, paulister007', 'if you beat your current highscore, you\'re a legend',
    ],

    show(element){
        element.style.display = 'block';
    },

    hide(element){
        element.style.display = 'none';
    },

    // --------------       TIMER        --------------------
    startTimer(){
        timer = setInterval(() => {        
            //change time limit border when time is between 50% and 30%
            if(time <= 0.5 * checkTime && time >= 0.3 * checkTime){
                this.timeLimitContainer.style.border = '2px solid var(--yellow, rgb(255, 210, 104))';
                this.timeLimitContainer.style.boxShadow = '0 5px 10px 5px rgb(255, 210, 104, 0.1)';
            }
            else if(time <= 0.3 * checkTime){
                this.timeLimitContainer.style.border = '2px solid var(--red, rgb(255, 93, 93))';
                this.timeLimitContainer.style.boxShadow = '0 5px 10px 5px rgb(255, 93, 93, 0.1)';
            }
            this.timeLimit.innerText = time + 's';
            time--;
            if(time < 0){
                this.stopTimer();
                this.timeLimit.innerText = '0s';
                this.displayGameOver(); //display game over when time limit is exceeded
            }
        }, 1000);
    },

    stopTimer(){
        clearInterval(timer);
        this.timerStarted = false;
        console.log('timer stopped');
    },

    // --------------       PROCESS GAME TEXT / TIME LIMIT        --------------------
    getTimeLimit(text, difficulty){
       if (difficulty == 'NEWBIE'){
            time = Math.round(this[`${difficulty.toLowerCase()}Pts`] * text.length);
       }
       else if(difficulty == 'MASTER'){
            time = Math.round(this[`${difficulty.toLowerCase()}Pts`] * text.length);
       }
       else if(difficulty == 'PRO'){
            time = Math.round(this[`${difficulty.toLowerCase()}Pts`] * text.length);     
       }

       //checkTime is a backup of original time alloted, its used to determine how critical time limit is
       checkTime = time; 
       this.timeLimit.innerText = time + 's';
    },

    changeGameText(){
        //empty the time limit and game text
        this.timeLimit.innerText = '...';
        this.gameText.innerText = '...';
        setTimeout(() => {
            this.userInput.focus(); //place input on focus
            let rndm = Math.floor(Math.random() * this.text.length);
            this.gameText.innerText = this.text[rndm];        
            this.getTimeLimit(this.text[rndm], this.difficulty.innerText); //get time limit

            this.text.splice(this.text.indexOf(this.text[rndm]), 1 ); //prevent a text from appearing twice
            this.timeLimitContainer.style.border = '2px solid var(--green, rgb(54, 210, 145)';
            this.timeLimitContainer.style.boxShadow = '0 5px 10px 5px rgb(54, 210, 145, 0.1)';

            //prevent timer from starting after already started
            if(!this.timerStarted){
                this.startTimer();
                this.timerStarted = true;
                console.log('timer started');
            }
        }, 2000);

    },

    // --------------       ACTIVATE GAME FUNCTIONS        --------------------
    launch(){
        //retrieve highscore from memory
        this.getHighScore();
        //game text backup
        gameTextCopy = this.text;
        //load setup page
        this.start.addEventListener('click', () => {
            this.hide(this.introPage);
            this.show(this.setupPage);
        });

        //display difficulty options
        this.difficultySelection.addEventListener('click', () => {
            if(this.difficultySelectionContainer.style.display != 'block') this.show(this.difficultySelectionContainer);
            else this.hide(this.difficultySelectionContainer);
        })

        //user selects difficulty level; newbie, master or pro
        this.newbieBtn.addEventListener('click', () => {
            this.newbieBtn.style.backgroundColor = 'var(--blue, rgb(22, 146, 254))';
            this.masterBtn.style.background = 'none';
            this.proBtn.style.background = 'none';
            this.difficulty.innerText = this.newbieBtn.innerText.toUpperCase();
        })
        
        this.masterBtn.addEventListener('click', () => {
            this.masterBtn.style.backgroundColor = 'var(--blue, rgb(22, 146, 254))';
            this.newbieBtn.style.background = 'none';
            this.proBtn.style.background = 'none';
            this.difficulty.innerText = this.masterBtn.innerText.toUpperCase();
        })

        this.proBtn.addEventListener('click', () => {
            this.proBtn.style.backgroundColor = 'var(--blue, rgb(22, 146, 254))';
            this.masterBtn.style.background = 'none';
            this.newbieBtn.style.background = 'none';
            this.difficulty.innerText = this.proBtn.innerText.toUpperCase();
        })

        //user starts game by clicking play button
        this.play.addEventListener('click', () => {
            this.hide(this.setupPage);
            this.show(this.gamePage);
            //change game texts
            this.changeGameText();
        })

        //process user input
        this.userInput.addEventListener('input', () => {
            //user inserts wrong text
            if(!this.gameText.innerText.startsWith(this.userInput.value)){
                this.userInput.style.backgroundColor = 'var(--red, rgb(255, 93, 93))';
                this.userInput.classList.add('shake');
                this.errorTone.play();
                setTimeout(() => {
                    this.userInput.classList.remove('shake');
                }, 200);
            }

            //user inserts correct text
            else if(this.gameText.innerText == this.userInput.value){
                this.userInput.style.backgroundColor = 'var(--green, rgb(54, 210, 145))';
                this.successTone.play();
                this.stopTimer();
                //remove focus from input
                this.userInput.blur(); 
                //if input happens to 
                if(this.userInput.value.endsWith(' ')){
                    this.userInput.value = this.userInput.value.trim();
                }
                //compute score
                this.score.innerText = Number(this.score.innerText) + this.userInput.value.length;
                setTimeout(() => {
                    this.changeGameText();
                    this.userInput.value = ''; //empty input value
                    this.userInput.style.backgroundColor = 'var(--input-color, rgb(43, 44, 49))';
                }, 2000);
            }
            else{
                this.userInput.style.backgroundColor = 'var(--input-color, rgb(43, 44, 49))';     
            }
        });

        // --------------       PAUSE        --------------------
        //paused button is clicked
        this.pause.addEventListener('click', () => {
            this.show(this.dimBackground);
            this.show(this.gamePaused);
            this.stopTimer();
            time = Number(this.timeLimit.innerText.replace('s', ''));
            //this.timeLimit.innerHTML = time;
            this.userInput.blur(); //remove focus from input
            this.pausedScore.innerText = this.score.innerText;

            //resume button is clicked
            this.resume.addEventListener('click', () => {
                this.hide(this.dimBackground);
                this.hide(this.gamePaused);
                //prevent timer from starting after already started
                if(!this.timerStarted){
                    this.startTimer();
                    this.timerStarted = true;
                    console.log('timer started');
                }
                this.userInput.focus();
            });
        });
    },

    //GAME OVER
    displayGameOver(){
        this.show(this.dimBackground);
        this.show(this.gameOver);
        this.timeLimit.innerHTML = '...';
        this.gameText.innerHTML = '...';
        this.userInput.blur(); //remove focus from input
        this.gameOverScore.innerText = this.score.innerText;
        //if current score is greater than highscore, make current score the new highscore else leave it as it is
        this.newHighScore.innerText = this.score.innerText > this.highScore.innerText ? 'NEW HIGH SCORE' : 'SCORE';
        this.highScore.innerText = this.score.innerText > this.highScore.innerText ? this.score.innerText : this.highScore.innerText;
        //reset input color
        this.userInput.style.backgroundColor = 'var(--input-color, rgb(43, 44, 49))';
        //save highscore to memory
        this.saveHighScore();

        this.playAgain.addEventListener('click', () => {
            this.hide(this.dimBackground);
            this.hide(this.gameOver);
            this.score.innerText = 0;
            this.text = gameTextCopy;
            this.userInput.value = '';
            this.changeGameText();
        })
    },

}

game.launch();
//game.show(game.setupPage);
//game.score.innerText = 0;
//this.score.innerText = '8944'                