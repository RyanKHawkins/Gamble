/*
G A M B L E 
Assortment of gambling games, 
starting with one.
*/

const QS = (q) => document.querySelector(q)
const QSA = (q) => [...document.querySelectorAll(q)]

//Initiate global variables
const bankDisplay = QS("#bankDisplay")
var bankAmount = 1000
updateBankDisplay()
var message = QS("#message")
const bet = QS("#betInput")
const bet_button = QS("#betButton")
const setBetHalf = QS("#betHalfButton")
const setBetAll = QS("#betAllButton")

//Set Event Listeners
bet_button.addEventListener("click", playBet)
setBetAll.addEventListener("click",
    () => {
        bet.value = parseInt(bankAmount)
        playBet()
    }
)
setBetHalf.addEventListener("click",
    () => {
        bet.value = parseInt(Math.round(bankAmount)) / 2
        playBet()
    }
)

function displayTempMessage(text, timeDelay = 2000) {
    bet_button.style.visibility = "hidden"
    message.innerText = text
    setInterval(() => {
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
    QS("#betInput").setAttribute("max", `${bankAmount}`)
    bet.value = 0
}

function isValidBet() {
    if (bet.value <= bankAmount && bet.value > 0) { return true };
    return false
}

function playBet() {

    if (!isValidBet()) resetBet()

    if (bet.value <= 0) {
        displayTempMessage("You must select a bet amount greater than 0.", 1000)
        return
    }
    if (bet.value > bankAmount) {
        displayTempMessage(`You don't have $${bet.value}.`, 1000)
        return
    }

    let currentBet = parseInt(bet.value)
    let randNum = Math.round(Math.random())
    if (randNum == 0) {
        displayTempMessage(`You won $${currentBet.toLocaleString()}!`)
        bankAmount += currentBet
    } else {
        displayTempMessage(`I'm sorry. You lost $${currentBet.toLocaleString()}`)
        message.style.color = "red"
        bankAmount -= currentBet
        if (bankAmount <= 0) { bankAmount = 50 };
    }

    updateBankDisplay()
    resetBet()
}

function testOdds(numOfTests) {
    var numOfWins = 0
    var numOfPlays = 0
    var numOfLosses = 0

    for (let i = 0; i < parseInt(numOfTests); i++) {
        let randNum = Math.round(Math.random())
        numOfPlays++
        randNum == 0 ? numOfWins++ : numOfLosses++
    }
    
    var winPercentage = numOfWins / numOfPlays

    console.log(`
    Wins:  ${numOfWins}
    Losses:  ${numOfLosses}
    Plays:  ${numOfPlays}
    You won ${winPercentage.toFixed(2)} of the games.
    `)
}