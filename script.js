/*
G A M B L E 
Assortment of gambling games, 
starting with one.
*/

const QS = (q) => document.querySelector(q);
const QSA = (q) => [...document.querySelectorAll(q)];

//Get DOM variables
const bankDisplay = QS("#bankDisplay");
let bankAmount = 1000;
let message = QS("#message");
const bet = QS("#betInput");
const bet_button = QS("#betButton");
const bet_half_button = QS("#betHalfButton");
const bet_all_button = QS("#betAllButton");
const BETTING_ODDS = 0.65;

updateBankDisplay()

//Set Event Listeners
bet_button.addEventListener("click", playBet)
window.addEventListener("keydown", function (event) {
    if (event.key == "Enter") { playBet() }
})

bet_all_button.addEventListener("click",
    () => {
        bet.value = parseInt(bankAmount)
        playBet()
    }
)
bet_half_button.addEventListener("click",
    () => {
        bet.value = parseInt(Math.round(bankAmount)) / 2
        playBet()
    }
)

//TODO:  Figure out timing inconsistency
function displayTempMessage(text, timeDelay = 1000) {
    bet_button.style.visibility = "hidden"
    message.innerText = text
    setTimeout(() => {
        message.innerText = "Place your bet."
        message.style = "normal"
        bet_button.style.visibility = "initial"
        //message.style.color = "black"
    }, timeDelay)
}

function updateBankDisplay() {
    bankDisplay.innerText = `Bank:  $${bankAmount.toLocaleString()}`
}

function resetBet() {
    bet.setAttribute("max", `${bankAmount}`)
    bet.value = 0
}

function isValidBet() {
    return (bet.value <= bankAmount && bet.value > 0)
}

function playBet() {

    if (bet.value <= 0) {
        displayTempMessage("Bet greater than 0.", 1000)
        return
    }
    if (bet.value > bankAmount) {
        displayTempMessage(`You don't have $${bet.value}.`, 1000)
        return
    }

    let currentBet = parseInt(bet.value)
    let randNum = Math.random();
    if (randNum <= BETTING_ODDS) {
        displayTempMessage(`You won $${currentBet.toLocaleString()}!`)
        bankAmount += currentBet
        setTimeout(updateBankDisplay, 1000)
    } else {
        displayTempMessage(`You lost $${currentBet.toLocaleString()}`)
        message.style.color = "red"
        bankAmount -= currentBet
        if (bankAmount <= 0) {
            bankDisplay.innerText = "BANKRUPT!!!"
            bankAmount = 50;
        };
        setTimeout(updateBankDisplay, 1000);
    }
    resetBet()
}

function testOdds(numOfTests) {
    let numOfWins = 0
    let numOfPlays = 0
    let numOfLosses = 0

    for (let i = 0; i < parseInt(numOfTests); i++) {
        let randNum = Math.random()
        numOfPlays++
        randNum <= BETTING_ODDS ? numOfWins++ : numOfLosses++
    }

    let winPercentage = numOfWins / numOfPlays

    console.log(`
    Wins:  ${numOfWins}
    Losses:  ${numOfLosses}
    Plays:  ${numOfPlays}
    You won ${winPercentage.toFixed(2)} of the games.
    `)
}
