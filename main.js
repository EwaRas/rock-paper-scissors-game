const images = document.querySelectorAll('.selectOption img');
let flag = false;


const gameResults = {
    rounds: 0,
    draw: 0,
    wins: 0,
    lost: 0
}
const game = {
    user: '',
    compy: ''
}

function userSelection() {
    if (!flag) {
        game.user = this.dataset.option;
        images.forEach(image => image.style.backgroundColor = `rgb(174, 205, 196)`);
        this.style.backgroundColor = `rgba(243, 217, 217, .6)`;
    } else alert(`Wanna play again?`);
}

images.forEach(image => image.addEventListener('click', userSelection));

function compySelection() {
    return (images[Math.floor(Math.random() * images.length)].dataset.option);
}

function showSelection() {
    images.forEach(image => image.style.display = 'none');
    let userImage = document.querySelector(`[data-option = '${game.user}']`);
    let compyImage = document.querySelector(`[data-option = '${game.compy}']`);
    if (userImage === compyImage) {
        function cloneImage() {
            let imageClone = document.createElement('img');
            imageClone.src = document.querySelector(`[data-option = '${game.compy}']`).src;
            imageClone.classList.add('clone');
            return document.querySelector('.selectOption').appendChild(imageClone);
        }

        compyImage = cloneImage();
    }
    userImage.style.display = 'block';
    userImage.style.opacity = '1';
    userImage.style.order = '0';
    compyImage.style.display = 'block';
    compyImage.style.order = '2';
    compyImage.style.opacity = '1';
    document.querySelector('.resultsSection').style.display = 'block';
}

function disappear() {
    //display: none; opacity: 0
    //selection : display: initial; opacity:1
}

function checkResults(user, compy) {
    const winner = document.querySelector('header p');
    if (user === compy) {
        winner.textContent = `It's a draw!`;
        gameResults.draw++;
    } else if ((user === 'rock' && compy === 'scissors') || (user === 'paper' && compy == 'rock') || (user === 'scissors' && compy == 'paper')) {
        winner.textContent = `You win!`;
        gameResults.wins++;
    } else {
        winner.textContent = `Compy wins!`;
        gameResults.lost++;
    }
    winner.style.color = `rgb(199,102,117)`;
    gameResults.rounds++;
}

function updateResults() {
    const results = document.querySelectorAll('.resultsSection p span');
    results.item(0).innerHTML = `<strong>${gameResults.rounds}</strong>`;
    results.item(1).innerHTML = `<strong>${gameResults.wins}</strong>`;
    results.item(2).innerHTML = `<strong>${gameResults.draw}</strong>`;
    results.item(3).innerHTML = `<strong>${gameResults.lost}</strong>`;
    console.log(results);
}

function restartGame() {
    document.querySelector('button').textContent = `Let's play again!`;
    flag = true;
}

function endGame() {
    images.forEach(image => image.style.display = 'initial');
    document.querySelector('.resultsSection').style.display = 'none';
    document.querySelector(`[data-option = '${game.user}']`).style.backgroundColor = `rgb(174, 205, 196)`;
    game.user = '';
    game.compy = '';
    if (document.querySelector('.clone')) {
        document.querySelector('.selectOption').removeChild(document.querySelector('.clone'));
    }
    document.querySelector('button').textContent = `Let's play!`;
    document.querySelector('header p').textContent = `CHOOSE ONE:`;
    document.querySelector('header p').style.color = `rgb(119, 136, 153)`;

    flag = false;
}

function startGame() {
    if (!flag) {
        if (!game.user) return alert(`Gotta choose rock, paper or scissors!`);
        game.compy = compySelection();
        console.log(game.compy);
        showSelection();
        checkResults(game.user, game.compy);
        updateResults();
        restartGame();
    } else endGame();
}
document.querySelector('button').addEventListener('click', startGame);