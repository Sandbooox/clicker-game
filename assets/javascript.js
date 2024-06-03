let counter = 0;
let clickValue = 1;
let upgradeCost = 10;
let autoClickerCost = 50;
let doubleClickCost = 100;
let autoClickSpeedCost = 200;
let tripleClickCost = 500;
let autoClickerInterval;
let autoClickSpeed = 1000;

const counterDisplay = document.getElementById('counter');
const clickButton = document.getElementById('clickButton');
const upgradeCostDisplay = document.getElementById('upgradeCost');
const autoClickerCostDisplay = document.getElementById('autoClickerCost');
const doubleClickCostDisplay = document.getElementById('doubleClickCost');
const autoClickSpeedCostDisplay = document.getElementById('autoClickSpeedCost');
const tripleClickCostDisplay = document.getElementById('tripleClickCost');
const buyButtons = document.querySelectorAll('.buy-button');
const resetButton = document.getElementById('resetButton');

clickButton.addEventListener('click', () => {
    counter += clickValue;
    updateCounterDisplay();
    updateShopButtons();
    saveGame();
});

buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const item = event.target.dataset.item;
        if (item === 'upgradeClick') {
            if (counter >= upgradeCost) {
                counter -= upgradeCost;
                clickValue++;
                upgradeCost *= 2;
                upgradeCostDisplay.textContent = upgradeCost;
            }
        } else if (item === 'autoClicker') {
            if (counter >= autoClickerCost) {
                counter -= autoClickerCost;
                startAutoClicker();
                autoClickerCost = Number.MAX_VALUE; // Disable further purchases
                autoClickerCostDisplay.textContent = 'Purchased';
            }
        } else if (item === 'doubleClick') {
            if (counter >= doubleClickCost) {
                counter -= doubleClickCost;
                clickValue *= 2;
                doubleClickCost = Number.MAX_VALUE; // Disable further purchases
                doubleClickCostDisplay.textContent = 'Purchased';
            }
        } else if (item === 'autoClickSpeed') {
            if (counter >= autoClickSpeedCost) {
                counter -= autoClickSpeedCost;
                autoClickSpeed = Math.max(autoClickSpeed / 2, 100); // Increase auto-click speed
                restartAutoClicker();
                autoClickSpeedCost *= 2;
                autoClickSpeedCostDisplay.textContent = autoClickSpeedCost;
            }
        } else if (item === 'tripleClick') {
            if (counter >= tripleClickCost) {
                counter -= tripleClickCost;
                clickValue *= 3;
                tripleClickCost = Number.MAX_VALUE; // Disable further purchases
                tripleClickCostDisplay.textContent = 'Purchased';
            }
        }
        updateCounterDisplay();
        updateShopButtons();
        saveGame();
    });
});

resetButton.addEventListener('click', resetGame);

function updateCounterDisplay() {
    counterDisplay.textContent = counter;
}

function updateShopButtons() {
    buyButtons.forEach(button => {
        const item = button.dataset.item;
        if (item === 'upgradeClick') {
            button.disabled = counter < upgradeCost;
        } else if (item === 'autoClicker') {
            button.disabled = counter < autoClickerCost;
        } else if (item === 'doubleClick') {
            button.disabled = counter < doubleClickCost;
        } else if (item === 'autoClickSpeed') {
            button.disabled = counter < autoClickSpeedCost;
        } else if (item === 'tripleClick') {
            button.disabled = counter < tripleClickCost;
        }
    });
}

function startAutoClicker() {
    if (!autoClickerInterval) {
        autoClickerInterval = setInterval(() => {
            counter += clickValue;
            updateCounterDisplay();
            saveGame();
        }, autoClickSpeed);
    }
}

function restartAutoClicker() {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
        autoClickerInterval = null;
    }
    startAutoClicker();
}

function saveGame() {
    const gameState = {
        counter,
        clickValue,
        upgradeCost,
        autoClickerCost,
        doubleClickCost,
        autoClickSpeedCost,
        tripleClickCost,
        autoClickSpeed
    };
    localStorage.setItem('clickerGameState', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = localStorage.getItem('clickerGameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        counter = gameState.counter;
        clickValue = gameState.clickValue;
        upgradeCost = gameState.upgradeCost;
        autoClickerCost = gameState.autoClickerCost;
        doubleClickCost = gameState.doubleClickCost;
        autoClickSpeedCost = gameState.autoClickSpeedCost;
        tripleClickCost = gameState.tripleClickCost;
        autoClickSpeed = gameState.autoClickSpeed;

        upgradeCostDisplay.textContent = upgradeCost;
        autoClickerCostDisplay.textContent = autoClickerCost >= Number.MAX_VALUE ? 'Purchased' : autoClickerCost;
        doubleClickCostDisplay.textContent = doubleClickCost >= Number.MAX_VALUE ? 'Purchased' : doubleClickCost;
        autoClickSpeedCostDisplay.textContent = autoClickSpeedCost;
        tripleClickCostDisplay.textContent = tripleClickCost >= Number.MAX_VALUE ? 'Purchased' : tripleClickCost;

        if (autoClickerCost >= Number.MAX_VALUE || autoClickSpeed !== 1000) {
            startAutoClicker();
        }
    }
    updateCounterDisplay();
    updateShopButtons();
}

function resetGame() {
    counter = 0;
    clickValue = 1;
    upgradeCost = 10;
    autoClickerCost = 50;
    doubleClickCost = 100;
    autoClickSpeedCost = 200;
    tripleClickCost = 500;
    autoClickSpeed = 1000;

    clearInterval(autoClickerInterval);
    autoClickerInterval = null;

    localStorage.removeItem('clickerGameState');
    
    upgradeCostDisplay.textContent = upgradeCost;
    autoClickerCostDisplay.textContent = autoClickerCost;
    doubleClickCostDisplay.textContent = doubleClickCost;
    autoClickSpeedCostDisplay.textContent = autoClickSpeedCost;
    tripleClickCostDisplay.textContent = tripleClickCost;

    updateCounterDisplay();
    updateShopButtons();
}

// Load the game state when the page loads
window.addEventListener('load', loadGame);
