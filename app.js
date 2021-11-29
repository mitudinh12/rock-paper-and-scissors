const game = () => {
    let pScore = 0;
    let cScore = 0;
    let isGameResetted = false;
    const winner = document.querySelector('.winner');
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const hands = document.querySelectorAll('.hands img');
    const computerOptions = ['rock', 'paper', 'scissors'];
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    let totalHistory = [];

    const startGame = () => {
        const playButton = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');
        playButton.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });

        for (const hand of hands) {
            hand.addEventListener('animationend', function() {
                hand.style.animation = '';
            })
        }

        for (const option of options) {
            option.addEventListener('click', function() {
                // Computer Choice 
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                disableButton();
                // Reset the hands to rock image before showing the results
                playerHand.src = "./assets/rock.png";
                computerHand.src = "./assets/rock.png";
                setTimeout(() =>  {
                    //Here is where we call compare hands
                    compareHands(option.textContent, computerChoice);
                    // Update images
                    playerHand.src = `./assets/${option.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                    undoDisableButton();
                }, 2000);             
                // Animation
                playerHand.style.animation = 'shakePlayer 2s ease';
                computerHand.style.animation = 'shakeComputer 2s ease';
            })
        }
    };
    // Disable buttons while the game is playing 
    function disableButton() {
        for (let option1 of options) {
            option1.disabled = true;
            option1.style.backgroundColor = 'rgb(112, 129, 124)';
        }
    }
    // Undo the disabled buttons
    function undoDisableButton() {
        for (let option2 of options) {
            option2.disabled = false;
            option2.style.backgroundColor = '';
        }
    }
    // Display the scores
    const updateScore = () => {
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };
    // Update the final winner who scores 10 points and reset the score
    function gameOver () {
        if (cScore == 9) { 
            cScore++;
            winner.textContent = 'Game over! Computer won the game! Click an option below to restart the game..';
        } else if (pScore == 9) {
            pScore++;
            winner.textContent = 'You won the game! Click an option below to restart the game..';
        }
        isGameResetted = true;
        updateScore();
    }
    // Update the final winner who scores 3 consecutive points.
    function checkThreeWins() {
        if (totalHistory.length >= 3) { 
            console.log(totalHistory);
            for (let i = 0; i < totalHistory.length; i++){ 
                if (totalHistory[i] == totalHistory[i+1] && totalHistory[i] == totalHistory[i+2]) {
                    if (totalHistory[i] == 'c') {
                        winner.textContent = 'Game over! Computer won 3 times in a row! Click an option below to restart the game..'; 
                    }            
                    if (totalHistory[i] == 'p') {
                        winner.textContent = 'You won the game with 3 wins in a row! Click an option below to restart the game..';
                    }
                    isGameResetted = true;
                    updateScore();     
                };
            };   
        };
    }
    

    const compareHands = (playerChoice, computerChoice) => { 
        // Reset the game if a winner is found
        if (isGameResetted) {
            pScore = 0;
            cScore = 0;
            totalHistory = [];
            isGameResetted = false;
            updateScore();
        }
        // Play normal game before final game
        if (pScore < 9 && cScore < 9) {
                // Check for a tie
            if (playerChoice == computerChoice) {
                winner.textContent = 'It is a tie';
                return;
            }   
                // Check for Rock
            if (playerChoice == 'rock') {
                if (computerChoice == 'scissors') {
                    winner.textContent = 'Player wins';
                    pScore++;
                    totalHistory.push('p');
                    checkThreeWins();
                } else {
                    winner.textContent = 'Computer wins';
                    cScore++;
                    totalHistory.push('c');
                    checkThreeWins();
                }
            }
                // Check for Paper
            if (playerChoice == 'paper') {
                if (computerChoice == 'rock') {
                    winner.textContent = 'Player wins';
                    pScore++;
                    totalHistory.push('p');
                    checkThreeWins();
                } else {
                    winner.textContent = 'Computer wins';
                    cScore++;
                    totalHistory.push('c');  
                    checkThreeWins();
                }
            }
                // Check for Scissors
            if (playerChoice == 'scissors') {
                if (computerChoice == 'paper') {
                    winner.textContent = 'Player wins';
                    pScore++;
                    totalHistory.push('p');
                    checkThreeWins();
                } else {
                    winner.textContent = 'Computer wins';
                    cScore++;
                    totalHistory.push('c');
                    checkThreeWins();
                }
            }
            updateScore();
        // Game point
        } else if (pScore == 9 | cScore == 9) {
            // Check for a tie
            if (playerChoice == computerChoice) {
                winner.textContent = 'It is a tie';
                return;
            }
            // Game point for computer
            if (cScore == 9) { 
                // Check for Rock
                if (playerChoice == 'rock') {
                    if (computerChoice == 'scissors') {
                        winner.textContent = 'Player wins';
                        pScore++;
                        totalHistory.push('p');
                        checkThreeWins();
                    } else {
                        gameOver();
                        return;
                    }
                }
                // Check for Paper
                if (playerChoice == 'paper') {
                    if (computerChoice == 'rock') {
                        winner.textContent = 'Player wins';
                        pScore++;
                        totalHistory.push('p');
                        checkThreeWins();
                    } else {
                        gameOver();
                        return;
                    }
                }
                // Check for scissors
                if (playerChoice == 'scissors') {
                    if (computerChoice == 'paper') {
                        winner.textContent = 'Player wins';
                        pScore++;
                        totalHistory.push('p');
                        checkThreeWins();
                    } else {
                        gameOver();
                        return;
                    }
                }
                updateScore();
            // Game point for player (user)
            } else if (pScore == 9) {
                // Check for Rock
                if (playerChoice == 'rock') {
                    if (computerChoice == 'scissors') {
                        gameOver();
                        return;
                    } else {
                        winner.textContent = 'Computer wins';
                        cScore++;
                        totalHistory.push('c');
                        checkThreeWins();
                    }
                }
                // Check for Paper
                if (playerChoice == 'paper') {
                    if (computerChoice == 'rock') {
                        gameOver();
                        return;
                    } else {
                        winner.textContent = 'Computer wins';
                        cScore++;
                        totalHistory.push('c');
                        checkThreeWins();
                    }
                }
                // Check for scissors
                if (playerChoice == 'scissors') {
                    if (computerChoice == 'paper') {
                        gameOver();
                        return;
                    } else {
                        winner.textContent = 'Computer wins';
                        cScore++;
                        totalHistory.push('c');
                        checkThreeWins();
                    }
                }
                updateScore();
            }
        }
    };

    // Call all the inner function
    startGame();
};


// start the game function
game();

