// creating a function to make writing test cases easier
function testGame(condition, message) {
    if (!condition) {
        console.error(message);
        return false;
    }
    return true;
}
// Test case 1: Create and verify a User object
let test1 = new User("Karim", "Almalakeh", "kalmalakeh", "123-456-7890", "New York City", "karim.mal@yahoo.com", 100);
let test1Pass = true;

if (!testGame(test1.bank === 100, "Test case 1 failed: Invalid bank amount")) test1Pass = false;
if (!testGame(test1.firstName === "Karim", "Test case 1 failed: Invalid first name")) test1Pass = false;
if (!testGame(test1.lastName === "Almalakeh", "Test case 1 failed: Invalid last name")) test1Pass = false;
if (!testGame(test1.username === "kalmalakeh", "Test case 1 failed: Invalid username")) test1Pass = false;
if (!testGame(test1.phoneNumber === "123-456-7890", "Test case 1 failed: Invalid phone number")) test1Pass = false;
if (!testGame(test1.city === "New York City", "Test case 1 failed: Invalid city")) test1Pass = false;
if (!testGame(test1.emailAddress === "karim.mal@yahoo.com", "Test case 1 failed: Invalid email address")) test1Pass = false;

if (test1Pass) {
    console.log("Test case 1 passed!");
}
//Test case 2: Create Dice object and ensure dice roll is between 1-6
let test2 = new Dice();
let test2Pass = true;
let rollValue = test2.roll();

if (!testGame(rollValue >= 1 && rollValue <= 6, "Test case 2 failed: Dice roll out of range")) test2Pass = false;

if (test2Pass) {
    console.log("Test case 2 passed!");
}
//Test case 3: Create and verify a Game object
let test3 = new Game(test1, 10);
let test3Pass = true;

if (!testGame(test3.user === test1, "Test case 3 failed: User not assigned correctlyd")) test3Pass = false;
if (!testGame(test3.betAmount === 10, "Test case 3 failed: Bet amount incorrect")) test3Pass = false;

if (test3Pass) {
    console.log("Test case 3 passed!")
}
//Test case 4: Ensure target number is set before playing
let test4 = new Game(test1, 10, undefined)
let test4Pass = true;

if (!testGame(test4.targetNumber === undefined, "Test case 4 failed: Target number must be set before playing")) test4Pass = false;

if (test4Pass) {
    console.log("Test case 4 passed!")
}
//Test case 5: Check if user can commence a game
let test5Pass = true;
test4.bank = 100;

test4.betAmount = 50;
if(!testGame(test4.user.userBet(50) === true, "Test case 5 failed: User should be able to bet")) test5Pass = false;

test4.betAmount = 500;
if(!testGame(test4.user.userBet(500) === false, "Test case 5 failed: Insuffiecient funds in bank account; cannot place a bet")) test5Pass = false;

if (test5Pass) {
    console.log("Test case 5 passed!")
}    
//Test case 6: Check for a winning condition; Roll target number
let user = new User("Karim", "Almalakeh", "kalmalakeh", "123-456-7890", "New York City", "karim.mal@yahoo.com");
user.bank = 100;
let test6 = new Game(user, 10, 5);
let test6Pass = true;

test6.rollDice = function () {
    return [2, 3];
};

let result6 = test6.playRound();
if (!testGame(result6 === "Target Number Rolled; You win!", "Test case 6 failed: Game did not recognnize a winning roll")) test6Pass = false;
if (!testGame(user.bank === 120, "Test case 6 failed: Bank amount did not update correctly after win; Expected bank to be 120")) test6Pass = false;

if (test6Pass) {
    console.log("Test case 6 passed!")
}
//Test case 7: Check for a losing condition; Roll Snake Eyes (1, 1)
user.bank = 100;
let test7Pass = true;
test6.rollDice = function () {
    return [1, 1];
};

let result7 = test6.playRound();
if (!testGame(result7 === "Snake Eyes; You lose.", "Test case 7 failed: Game did not recognize a losing roll")) test7Pass = false;
if (!testGame(user.bank === 90, "Test case failed: Bank amount did not update correctly after loss; Expected bank to be 90")) test7Pass = false;

if (test7Pass) {
    console.log("Test case 7 passed!")
}

//Test case 8: Check loop if winning condition nor losing condition was obtained 

let test8Pass = true;
let testGame8 = new Game(user, 10, 8);

testGame8.rollDice = function () {
    return [6,5];
}

let result8 = testGame8.playRound();
if (!testGame(result8 === undefined, "Test case 8 failed: Game should continue if neither win nor loss")) test8Pass = false;
if (test8Pass) {
    console.log("Test case 8 passed!")
}
//Test case 9: Ensure the game properly handles multiple consecutive rounds
let test9Pass = true;
user.bank = 100;  
let testGame9 = new Game(user, 10, 6);

// First round (Win)
testGame9.rollDice = function () {
    return [3, 3];
};
testGame9.playRound();
if (!testGame(user.bank === 120, "Test case 9 failed: Bank amount did not update correctly after win; Expected bank to be 120")) test9Pass = false;

// Second round (Loss)
testGame9.rollDice = function () {
    return [1, 1];  
};
testGame9.playRound();
if (!testGame(user.bank === 110, "Test case 9 failed: Bank amount did not update correctly after loss; Expected bank to be 110")) test9Pass = false;

if (test9Pass) {
    console.log("Test case 9 passed!");
}

//Test case 01: Ensure game does not allow betting after losing all money
let test10Pass = true;
user.bank = 10;
testGame9. rollDice = function () {
    return [1, 1]
};
testGame9.playRound();

if (!testGame(user.bank === 0, "Test case 10 failed: Bank should be 0 after losing all money")) test10Pass = false;
if (!testGame(user.userBet(10) === false, "Test case 10 failed: User should not be able to bet with 0 balance")) test10Pass = false;

if (test10Pass) {
    console.log("Test case 10 passed!");
}
//Test case 11: Ensure game allows betting the exact remaining balance
let test11Pass = true;
user.bank = 25;

if (!testGame(user.userBet(25) === true, "Test case 11 failed: User should be able to bet their exact remaining balance")) test11Pass = false;

if (test11Pass) {
    console.log("Test case 11 passed!");
}
//Test case 12: Checks game win condition
let test12Pass = true;
user.bank = 250;

if (!testGame(testGame9.endingCondition() === "You Win", "Test case 12 failed: Expected You Win")) test12Pass = false;

if (test12Pass) {
    console.log("Test case 12 passed!");
}
//Test case 13: Checks game lose condition
let test13Pass = true;
user.bank = 0;

if (!testGame(testGame9.endingCondition() === "You Lose", "Test case 13 failed: Expected You Lose")) test13Pass = false;

if (test13Pass) {
    console.log("Test case 13 passed!");
}
// Test case 14: Test adjustBank() method for deposits
user.bank = 100;
user.adjustBank(50);
let test14Pass = true;

if(!testGame(user.bank === 150, "Test case 14 failed: Invalid bank amount after deposit")) test14Pass = false;

if(test14Pass) {
    console.log("Test case 14 passed!");
}

// Test case 15: Test adjustBank() method for withdrawls
user.bank = 100;
user.adjustBank(-50);
let test15Pass = true;
if(!testGame(user.bank === 50, "Test case 15 failed: Invalid bank amount after withdrawal")) test15Pass = false;

if(test15Pass) {
    console.log("Test case 15 passed!");
}

// Test case 16: Ensure adjustBank() prevents a negative balance 
user.bank = 10;
user.adjustBank(-150);
let test16Pass = true;

if (!testGame(user.bank <= 0, "Test case 16 failed: Bank balance is negative")) test16Pass = false;

if (test16Pass) {
    console.log("Test case 16 passed!");
}