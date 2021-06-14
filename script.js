/*
G A M B L E 
Assortment of gambling games, 
starting with one.
*/

const QS = (q) => document.querySelector(q)
const QSA = (q) => [...document.querySelectorAll(q)]

//Initiate variables
const bankDisplay = QS("#bankDisplay")
var bankAmount = 1000
updateBankDisplay()
var message = QS("#message")
const bet = QS("#betInput")
const bet_button = QS("#betButton")
const setBetHalf = QS("#betHalfButton")
const setBetAll = QS("#betAllButton")

//Event Listeners
bet_button.addEventListener("click", playBet)
setBetAll.addEventListener("click",
    () => { bet.value = parseInt(bankAmount) }
)
setBetHalf.addEventListener("click",
    () => { bet.value = parseInt(Math.round(bankAmount)) / 2 }
)

function displayTempMessage(text, timeDelay = 5000) {
    message.innerText = text
    setInterval(() => {
        message.innerText = "Place your bet."
        message.style = "normal"
        //message.style.color = "black"
    }, timeDelay)
}

function updateBankDisplay() {
    if (bankAmount <= 0) { bankAmount = 10 };
    bankDisplay.innerText = `$${bankAmount.toLocaleString()}`
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
    isValidBet() ? console.log("valid") : console.log("not valid")
    if (bet.value <= 0) {
        displayTempMessage("You must select a bet amount.")
    }
    else if (bet.value > bankAmount) {
        displayTempMessage(`You don't have $${bet.value}.`)
    }


    else {
        let currentBet = parseInt(bet.value)
        let randNum = Math.round(Math.random())
        if (randNum == 0) {
            displayTempMessage(`You won $${currentBet.toLocaleString()}!`)
            bankAmount += currentBet
        } else {
            displayTempMessage(`I'm sorry. You lost $${currentBet.toLocaleString()}`)
            message.style.color = "red"
            bankAmount -= currentBet
        }
    }

    updateBankDisplay()
    resetBet()
}



/* Old way
setInterval(
    function () {
        //if (bankAmount < 100) { bankAmount += 5 }
        if (bankAmount <= 0) { bankAmount = 10 }
        bankDisplay.innerText = `$ ${bankAmount.toLocaleString()}`
        QS("#betInput").setAttribute("max", `${bankAmount}`)
    }, 2000
)
*/