//User score
const userChoiceEl = document.querySelector('.game_score-user--choice');
const userScore = document.querySelector('.game_score-user--score');

//Computer score
const computerChoiceEl = document.querySelector('.game_score-computer--choice');
const computerScore = document.querySelector('.game_score-computer--score');

//Game Result Text
const gameResult = document.querySelector('.game_result');

// New Choice Buttons
const choiceButtons = document.querySelectorAll('.game_choose-button');

//Reset Button
const resetButton = document.querySelector('.game_reset-button');

const choiceMap = ['fa-hand-scissors', 'fa-hand-back-fist', 'fa-hand']
const resultsMap = {
    draw: 'It’s a draw!', 
    scissorspaper: 'Scissors cuts paper', 
    paperrock: 'Paper covers Rock', 
    rockscissors: 'Rock beats scissors'
};

function disableButtons(shouldDisable) {
    choiceButtons.forEach(button => {
        button.disabled = shouldDisable;
    });
}

function toggleChoiceClass(element, icon) {
    if (element.classList.length < 3) element.classList.add(icon);
    else element.classList.replace(element.classList[2], icon);
}

function getChoice(icon) {
    switch(icon) {
        case 'fa-hand':
            return 'paper';
        case 'fa-hand-scissors':
            return 'scissors';
        case 'fa-hand-back-fist':
            return 'rock'
    }
}

function getResult() {
    const computerChoice = getChoice(computerChoiceEl.classList[2]);
    const userChoice = getChoice(userChoiceEl.classList[2]);
    
    switch (userChoice + computerChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            gameResult.classList.add('win');
            userScore.textContent = Number(userScore.textContent) + 1;
            gameResult.textContent = `${resultsMap[userChoice + computerChoice]}. You win!`;
            break;
        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            gameResult.classList.remove('win');
            computerScore.textContent = Number(computerScore.textContent) + 1;
            gameResult.textContent = `${resultsMap[computerChoice + userChoice]}. You lose!`;
            break;
        case 'rockrock':
        case 'scissorsscissors':
        case 'paperpaper':
            gameResult.classList.remove('win');
            gameResult.textContent = `It's a draw! You both chose ${userChoice}`;
            break;
    }
}

function userNewChoice(event) {
    const buttonClass = event.target.tagName === 'I' ? event.target.classList[2] : event.target.children[0].classList[2];
    disableButtons(true);
    toggleChoiceClass(userChoiceEl, buttonClass)
    userChoiceEl.style.opacity = '1';
    computerNewChoice();
}

function computerNewChoice() {
    const option = Math.floor(Math.random() * 3);
    toggleChoiceClass(computerChoiceEl, choiceMap[option])
    computerChoiceEl.style.opacity = '1';
    disableButtons(false);
    getResult();
}

function resetGame() {
    computerChoiceEl.style.opacity = '0';
    computerChoiceEl.style.opacity = '1';
    disableButtons(false);
    gameResult.classList.remove('win')
    gameResult.textContent = 'Try your luck!';
    userScore.textContent = computerScore.textContent = '0';
}

function init() {
    choiceButtons.forEach(button => button.addEventListener('click', userNewChoice));
    resetButton.addEventListener('click', resetGame);
}

init();