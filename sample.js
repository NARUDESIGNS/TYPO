let listOfTextChar = this.gameText.innerText.split('');
for (let i = 0; i < this.userInput.value.length; i++){
    if(this.userInput.value[i] == this.gameText.innerText[i]){
        
    }
}

    // -------------- WE ARE STILL ON SCORE --------------------
    //compute score
    computeScore(){
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Backspace' && this.gameText.innerText.startsWith(this.userInput.value)){
                e.preventDefault(); //prevent user from deleting letter if it matches 
                //do nothing
            }
            else if(this.gameText.innerText.startsWith(this.userInput.value)){
                //let scoreBoard = Number(this.score.innerText) + 1;
                for (let i = 0; i < this.userInput.value.length; i++){
                    if(this.userInput.value[i] == this.gameText.innerText[i]){
                        this.score.innerText = Number(this.score.innerText) + 2;                    
                    }
                }
                //this.score.innerText = Number(this.score.innerText) + 2;
            }
            else if(!this.gameText.innerText.startsWith(this.userInput.value)){
                //do nothing
                console.log('true');
            }
        });       
    }