let timeLeft = 10;
let score = 0;
let timer;

const clickButton = document.getElementById('clickButton');
const timeLeftDisplay = document.getElementById('timeLeft');
const scoreDisplay = document.getElementById('score');

clickButton.addEventListener('click', () => {
    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            clickButton.disabled = true;
            clickButton.textContent = 'Time\'s up!';
        }
    }, 1000);
}

window.onload = () => {
    startTimer();
};
