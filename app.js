
const textCopy = [
        'Relocation', 'Emergencies', 'Interrogation', 'Delusional', 'Inadequate', 'Propellant', 'Underestimated', 
        'Reconciliation', 'Bias', 'Pagination', 'Detectives', 'Abandoned', 'Mountain view',
        'Reach for your soul', 'Search the drawers now', 'If you love it, take it', 'Take what belongs to you', 
        'Reach for the skies', 'Now is the time', 'Objections are valid',
        'Naru is working to reach his goals', 'Rest in peace Kobe Bryant', 'If you are here, smile', 
        'I prefer shorter girls', 'I like to wrap them in my arms', 'God save us all from COVID19',
        'NOT everyone believes in your abilities',  'Nothing will happen', 'Nothing', 'If you do not see me by 5...', 
        'I am probably not coming today', 'Make 3 wishes now',  'Use your magic wand ', 'It would come to pass', 
        'Long texts sucks, i know', 'Just believe',
        'If 10 plus 10 is 20, what is 11 plus 11?', 'Do not run away from it', 'It is who you are!', 'I just want to know', 'Do you like me? never mind', 'I took time to make this', 'I hope it is worth it though', '250 people suffered from it', 'They are all really fine now',
        'A girl is no one', 'I am the three eyed raven', 'I prefer iphone to other mobile devices', 'Do not ask me why', 'A lannister always pays his debt', 'Things we do for love', 'Tell him to come bend the knee', 'I would spare everyone of them', 'Kings Landing', 'High garden',
        'All hail the mother of Dragons', 'I give you my word, I am true to my word as always', 'Many have tried', 'None has defeated them in an open field', 'That which is dead may never die', 'A wise man once said...', 'Winter is coming', 'Tokyo and Nairobi are my favorites', 'How about you?',
        'God loves me, I am so sure about it', 'What would you do if you won 10million Dollars?', 'I hope to be super good in programming in the nearest years', 'I do not tweet a lot', 'I find you interesting', 'Follow me on twitter, paulister007', 'If you beat your current highscore, you are a legend',
        'Grenade', 'Supplies', 'Stitches', 'Producer', 'Blurry', 'Logical', 'Humble', 'Village', 'Unfold', 'Vibrant', 'Clearance', 'Govern', 'Nonsense', 'Studious', 'Department', 'Flowers', 'Squares', 'Bitter', 'Activate', 'Squeeze', 'Separate', 'Operation', 'Alignment', 'Forgiven', 'Creative', 'Uphold', 'Decline', 'Followers', 'Sponsors',
    ];

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
    restart : document.getElementById('restart'),
    timeLimit : document.getElementById('game-time'),
    timeLimitContainer : document.getElementById('time-limit-container'),
    gameText : document.getElementById('game-text'),
    userInput : document.getElementById('game-input'),
    successTone : document.getElementById('success-sound'),
    errorTone : document.getElementById('error-sound'),

    dimBackground : document.getElementById('dim'),
    pausedView : document.getElementById('game-paused'),
    restartView : document.getElementById('game-restart'),
    noRestart : document.getElementById('no-restart'),
    yesRestart : document.getElementById('yes-restart'),
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
    gameIsPaused : false,
    inputIsValid : false,
    
    saveHighScore() {
        localStorage.setItem('getHighScore', (this.highScore.innerText));
    },

    //retrieve highscore from memory if it exists
    getHighScore(){
        if(localStorage.getItem('getHighScore')) this.highScore.innerText = localStorage.getItem('getHighScore');
    },

    text : textCopy.map(string => { return string}),

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
        if(!this.gameIsPaused){
            //empty the time limit and game text
            this.timeLimit.innerText = '...';
            this.gameText.innerText = '...';
            setTimeout(() => {
                this.userInput.focus(); //place input on focus
                rndm = Math.floor(Math.random() * this.text.length);
                this.gameText.innerText = this.text[rndm];        
                this.getTimeLimit(this.text[rndm], this.difficulty.innerText); //get time limit

                this.timeLimitContainer.style.border = '2px solid var(--green, rgb(54, 210, 145)';
                this.timeLimitContainer.style.boxShadow = '0 5px 10px 5px rgb(54, 210, 145, 0.1)';

                //prevent timer from starting after already started
                if(!this.timerStarted){
                    this.startTimer();
                    this.timerStarted = true;
                    console.log('timer started');
                }
            }, 2000);
            this.inputIsValid = false;
        }

    },

    // --------------       ACTIVATE GAME FUNCTIONS        --------------------
    launch(){
        console.log(this.text.length, textCopy.length, ' after launch');
        //retrieve highscore from memory
        this.getHighScore();
        //--------------- load setup page by clicking start -----------------
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

        //------------------ user starts game by clicking play button -----------------
        this.play.addEventListener('click', () => {
            this.hide(this.setupPage);
            this.show(this.gamePage);
            //change game texts
            this.changeGameText();
        })

        //process user input
        this.userInput.addEventListener('input', () => {
            //---------- user inserts wrong text -----------

            if(!this.gameText.innerText.startsWith(this.userInput.value)){            
                //if input happens to end with space, trim it
                if(this.userInput.value.endsWith(' ')){
                    this.userInput.value = this.userInput.value.trim();
                }
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
                this.inputIsValid = true;
                //remove focus from input
                this.userInput.blur(); 
                //compute score
                this.score.innerText = Number(this.score.innerText) + this.userInput.value.length;
                //prevent a text from appearing twice
                this.text.splice(this.text.indexOf(this.text[rndm]), 1 ); 
                console.log(this.text.length, textCopy.length, 'after correct input');
                setTimeout(() => {
                    this.changeGameText();
                    this.userInput.value = ''; //empty input value
                    this.userInput.style.backgroundColor = 'var(--input-color, rgb(43, 44, 49))';
                }, 2000);
            }
            else{
                this.userInput.style.backgroundColor = 'var(--input-color, rgb(43, 44, 49))';     
            }

            //prevent user from deleting letter if it matches
            document.addEventListener('keydown', (e) => {
                if(e.key === 'Backspace' && this.gameText.innerText.startsWith(this.userInput.value)){
                    e.preventDefault(); //prevent delete key from deleting 
                    //do nothing
                }
            })
        });

        // --------------       PAUSE        --------------------
        //paused button is clicked
        this.pause.addEventListener('click', () => {
            if(this.timeLimit.innerText == '...' || this.inputIsValid == true){
                //do nothing
            }
            else{
                this.gameIsPaused = true;
                this.show(this.dimBackground);
                this.show(this.pausedView);
                this.stopTimer();
                time = Number(this.timeLimit.innerText.replace('s', ''));
                this.userInput.blur(); //remove focus from input
                this.pausedScore.innerText = this.score.innerText;

                //resume button is clicked
                this.resume.addEventListener('click', () => {
                    this.gameIsPaused = false;
                    this.hide(this.dimBackground);
                    this.hide(this.pausedView); 
                    
                    //prevent timer from starting after already started
                    if(!this.timerStarted){
                        this.startTimer();
                        this.timerStarted = true;
                        console.log('timer started');
                    }
                    this.userInput.focus();
                });                
            }

        });

        // --------------       RESTART        --------------------
        //restart button is clicked
        this.restart.addEventListener('click', () => {
            this.show(this.dimBackground);
            this.show(this.restartView);
            this.stopTimer();
            time = Number(this.timeLimit.innerText.replace('s', ''));
            this.userInput.blur(); //remove focus from input

            //user discards restart
            this.noRestart.addEventListener('click', () => {
                this.hide(this.dimBackground);
                this.hide(this.restartView);
                //prevent timer from starting after already started
                if(!this.timerStarted){
                    this.startTimer();
                    this.timerStarted = true;
                    console.log('timer started');
                }
                this.userInput.focus();
            })

            //user confirms restart
            this.yesRestart.addEventListener('click', () => {
                this.hide(this.dimBackground);
                this.hide(this.restartView);
                this.score.innerText = 0;
                //game text backup
                this.text = textCopy.map(string => { return string});
                console.log(this.text.length, textCopy.length, ' after restart');
                this.userInput.value = '';
                this.hide(this.gamePage);
                this.show(this.setupPage);
                //reload the page
                // location.reload(); 
            })
            
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
        this.newHighScore.innerText = Number(this.score.innerText) > Number(localStorage.getItem('getHighScore')) ? 'NEW HIGH SCORE' : 'SCORE';
        this.highScore.innerText = Number(this.score.innerText) > Number(localStorage.getItem('getHighScore')) ? this.score.innerText : this.highScore.innerText;
        //reset input color
        this.userInput.style.backgroundColor = 'var(--input-color, rgb(43, 44, 49))';
        //save highscore to memory
        this.saveHighScore();
        console.log(this.text.length, textCopy.length, 'after game over');

        //PLAY AGAIN
        this.playAgain.addEventListener('click', () => {
            this.hide(this.dimBackground);
            this.hide(this.gameOver);
            this.score.innerText = 0;
            //game text backup
            this.text = textCopy.map(string => { return string});
            console.log(this.text.length, textCopy.length, ' after play again');
            this.userInput.value = '';
            this.changeGameText();
        })
    },
    
}

game.launch();
// game.show(game.gamePage);
// game.hide(game.introPage);
//game.score.innerText = 0;
//this.score.innerText = '8944'                