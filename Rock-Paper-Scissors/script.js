let userScore = 0;
let compScore = 0;
let gameCount = 0;
const totalRounds = 5;

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const series = document.querySelector('#series')
const userScorePara = document.querySelector('#user-score');
const compScorePara = document.querySelector('#comp-score');
const resetButton = document.querySelector('#resetbutton');

resetButton.addEventListener('click', resetGame);

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    });
});

function genCompChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randInx = Math.floor(Math.random() * 3);
    return options[randInx];
}

function playGame(userChoice) {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        const userWin = determineWinner(userChoice, compChoice);
        showWinner(userWin, userChoice, compChoice);
    }
    gameCount++;
    series.innerText = `Series ends in ${5-gameCount} rounds`;
    checkGameOver();
}

function determineWinner(userChoice, compChoice) {
        userWin = true;
        if (userChoice === 'rock') {
            // rock beats scissors or paper beats rock
            userWin = compChoice === 'paper' ? false: true;
        } else if (userChoice === 'paper') {
            // paper beats rock or scissors beats paper
            userWin = compChoice === 'scissors' ? false: true;
        } else {
            //scissors beats paper or rock beats scissors
            userWin = compChoice === 'rock' ? false: true;
        } 
    return userWin;
}

function showWinner(userWin, userChoice, compChoice) {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = 'green';
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = 'red';
    }
}

function drawGame() {
    msg.innerText = 'Game was Draw. Play again.';
    msg.style.backgroundColor = '#081b31';
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    gameCount = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = 'Play Your Move';
    msg.style.backgroundColor = '#081b31';
    series.innerText = `Series ends in ${5-gameCount} rounds`;
    series.style.backgroundColor = '#081b31'
    userScorePara.style.animation = 'scoreUpdate 1s';
    compScorePara.style.animation = 'scoreUpdate 1s';
}

function checkGameOver() {
    if (gameCount >= totalRounds) {
        if(userScore > compScore ){
            const winner = 'You win the series! Click on Reset Game to restart.';
            series.innerText = winner;
            series.style.backgroundColor = 'green';
        }
        else if (userScore < compScore) {
            const winner = 'Computer wins the series! Click on Reset Game to restart.';
            series.innerText = winner;
            series.style.backgroundColor = 'red';
        }
        else {
            const winner = 'The series is a draw! Click on Reset Game to restart.';
            series.innerText = winner;
            series.style.backgroundColor = '#081b31';
        }
        
    }
}
