// Dice class
class Dice {
    // Dice constructor
    constructor() {
        this.sides = 6;
    }
    // Method to simualte dice rolling 
    roll() {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

class Game {
    // Game constructor
    constructor(user, betAmount, targetNumber) {
        this.user = user;
        this.targetNumber = targetNumber;
        this.betAmount = betAmount;
        this.dice1 = new Dice();
        this.dice2 = new Dice(); 
    }
    // Method to roll both dice and return the result in an array
    rollDice() {
        let roll1 = this.dice1.roll();
        let roll2 = this.dice2.roll();
        return [roll1, roll2];
    }
    // Method that simualtes one round of the game
    playRound(onFinalResult, onIntermediateResult = () => {}) {
        if (!this.user.userBet(this.betAmount)) {
            onFinalResult("Insufficient funds to place this bet.");
            return;
        }
        if (this.targetNumber < 3 || this.targetNumber > 12) {
            onFinalResult("Invalid target number. Choose between 3 and 12.");
            return;
        }
    
        let reroll = () => {
            animateDice();
            let [roll1, roll2] = this.rollDice();
            let sum = roll1 + roll2;

            onIntermediateResult(roll1, roll2, sum);
    
            if (sum === 2) {
                this.user.adjustBank(-this.betAmount);
                onFinalResult(`Rolled [${roll1}, ${roll2}] = ${sum}. Snake Eyes!<br> You lose.`);
            } else if (sum === this.targetNumber) {
                this.user.adjustBank(this.betAmount * 2);
                onFinalResult(`Rolled [${roll1}, ${roll2}] = ${sum}. Target number hit!<br> You win!`);
            } else {
                setTimeout(reroll, 2000); 
            }
        };
        reroll(); 
        
    }
    // Method to check if the game has ended
    endingCondition() {
        if(this.user.bank >= 200) {
            return "You Win!";
        } else if (this.user.bank === 0) {
            return "You Lose :(";
        }     
    }
}
    
// User class
class User {
    // User constructor
    constructor(firstName, lastName, username, phoneNumber, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.email = email;
        this.bank = 100;
    }
    // getter method to return full name
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    // Method to adjust the users bank balance
    adjustBank(amount) {
        this.bank += amount;
    }
    // Method to check if the user can afford the bet
    userBet(betAmount) {
        return betAmount <= this.bank;
    }
}

const $$ = sel => document.querySelector(sel);

// grab elements from the DOM
const userInfo = $$("#userInfo");
const betForm = $$("#betForm");
const betInput = $$("#betInput");
const targetInput = $$("#targetInput");
const betError = $$("#betError");
const diceResult = $$("#diceResult");
const bankRoll = $$("#bankRoll");
const gameStatus = $$("#gameStatus");
const h1 = $$("#header");
const  h2 = $$("#h2");

let user;

window.addEventListener("DOMContentLoaded", () => {
    // create a user object 
    user = createUser();
    // display a welcome message
    header.textContent = `Welcome ${user.fullName}, to Snake Eyes Showdown!`; 
    const storedBank = parseInt(localStorage.getItem("bank"));
     // Retrieve stored bank amount or default to 100 if none exists
    user.bank = isNaN(storedBank) ? 100 : storedBank;
    const lastVisit = localStorage.getItem("lastVisit");
    const myDate = new Date();
    localStorage.setItem("lastVisit", myDate.toLocaleString());
    // Inject user details into the user info section
    userInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.fullName}</p>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Phone:</strong> ${user.phoneNumber}</p>
        <p><strong>City:</strong> ${user.city}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Bankroll:</strong> $<span id="liveBank">${user.bank}</span></p>
        <p><strong>Last Visit:</strong> ${lastVisit || "This is your first visit!"}</p>
       <p><em><strong>Not ${user.fullName}?</strong></em>
        <button id="logOut" class="logOutBtn">Change your credentials</button>
       </p>
       <button id="exitBtn">Leave Game</button>
    `;
    $$("#exitBtn").addEventListener("click", leaveGame);
    $$("#logOut").addEventListener("click", logO);
    updateBankDisplay();
});

// Handle form submission
betForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bet = parseInt(betInput.value);
    const target = parseInt(targetInput.value);

    if (bet < 1 || bet > user.bank) {
        betError.textContent = `Bet amount needs to be lower than bank amount, user has:${user.bank}.`;
        return;
    }

    betError.textContent = ""; 

    //Create a new game instance and initiata a round
    const game = new Game(user, bet, target);
    //Start the game round
    game.playRound((message) => {
        // Callback when round ends, display result message
        diceResult.innerHTML = message;
        updateBankDisplay();
        localStorage.setItem("bank", user.bank);

        // Clear all previous feedback classes
    gameFeedback.classList.remove("feedbackWin", "feedbackLose", "feedbackNeutral", "winText", "loseText");

     // Apply correct feedback based on message content
    if (message.includes("win") || message.includes("Target hit")) {
        gameFeedback.classList.add("feedbackWin", "winText");
    } else if (message.includes("lose") || message.includes("Snake Eyes")) {
        gameFeedback.classList.add("feedbackLose", "loseText");
    } else {
        gameFeedback.classList.add("feedbackNeutral");
    }
    }, 
    (roll1, roll2, sum) => {
        // Second calllback to show the use what they rolled if it isnt the target number or Sanke Eyes
        diceResult.textContent = `Rolled [${roll1}, ${roll2}] = ${sum}`;
        gameFeedback.classList.remove("feedbackWin", "feedbackLose", "winText", "loseText");
        gameFeedback.classList.add("feedbackNeutral");
    });
});

// handles the creation of the user object
function createUser() {
    const keys = ["firstName", "lastName", "username", "phoneNumber", "city", "email"];
    const values = keys.map(k => localStorage.getItem(k));
    const user = new User(...values);

    const bank = parseInt(localStorage.getItem("bank"));
    user.bank = isNaN(bank) ? 100 : bank;

    return user;
}
// Updates the bankroll display in two locations
function updateBankDisplay() {
    $$("#liveBank").textContent = user.bank;
    bankRoll.textContent = `Current Bank Balance: $${user.bank}`;
}

// Handles exiting the game and returning to homepage
function exitGame(clearStorage = false, message = false, customMessage = "", redirect = "index.html") {
    h2.style.display = "none";
    bankRoll.style.display = "none";
    // clear any lingering styles to display thank you message
    diceResult.innerHTML = "";
    gameFeedback.classList.remove("feedbackWin", "feedbackLose", "winText", "loseText", "feedbackNeutral");
    gameFeedback.classList.add("feedbackNeutral");
    // Show final message
    if (message){
    gameStatus.innerHTML = customMessage ||
    `
      <h3>Thanks for playing Snake Eyes Showdown, ${user.firstName}!</h3>
      <p>Your final bankroll: $${user.bank}. See you again soon!</p>
      <p>You'll be redirected to the homepage shortly...</p>
    `;
    }
    betForm.style.display = "none";

    if (clearStorage) {
        const keys = ["firstName", "lastName", "username", "phoneNumber", "city", "email", "bank", "lastVisit"];
        keys.forEach(k => localStorage.removeItem(k));
    }
  
    setTimeout(() => {
      window.location.href = redirect;
    }, 4000); 
}
 
// Handles exiting the game and returning to homepage
function leaveGame() {
    exitGame(false, true);
}
// handles logging out the user and removing their info from local storage then redirecting them to the form
  function logO() {
    const logMessage = `
        <h3>You've been successfully logged out, ${user.firstName}.</h3>
        <p>Your progress has been deleted. We hope to see you again soon!</p>
        <p>Redirecting you back to the homepage...</p>
        `;
    exitGame(true, true, logMessage, "intro.html");   
  }
  // handles the animation of the dice at the top of game.html
  function animateDice() {
    const dice = document.querySelector("#diceGraphic");
    if (dice) {
        dice.classList.add("rolling");
        setTimeout(() => dice.classList.remove("rolling"), 1000);
    }
}