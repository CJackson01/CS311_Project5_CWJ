var WIN = 0, LOSE = 1, CONTINUE_ROLLING = 2;

var firstRoll = true,
  sumOfDice = 0,
  myPoint = 0,
  gameStatus = CONTINUE_ROLLING,
  myBank = 100,
  myBet = 0; 

function getBet() {
  myBet = parseInt(document.getElementById("bet").value); 
}

function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function play() {
  if (myBank <= 0) {
    window.alert("Game over! You are out of money.");
    return;
  }

  if (firstRoll) {
    sumOfDice = rollDice();

    switch (sumOfDice) {
      case 7:
      case 11:
        gameStatus = WIN;
        myBank += myBet;
        break;
      case 2:
      case 3:
      case 12:
        gameStatus = LOSE;
        myBank -= myBet;
        break;
      default:
        gameStatus = CONTINUE_ROLLING;
        myPoint = sumOfDice;
        break;
    }

    document.craps.point.value = myPoint;
  } else {
    sumOfDice = rollDice();

    if (sumOfDice === myPoint)
      gameStatus = WIN,
        myBank += myBet;
    else if (sumOfDice === 7)
      gameStatus = LOSE,
        myBank -= myBet;
  }

  document.craps.bank.value = formatUSD(myBank);

  if (gameStatus === CONTINUE_ROLLING)
    window.alert("You rolled " + sumOfDice + " Point is " + myPoint);
  else {
    if (gameStatus === WIN)
      window.alert("You rolled " + sumOfDice + " You Win!");
    else
      window.alert("You rolled " + sumOfDice + " You Lose!");

    if (myBank <= 0) {
      window.alert("Game over! You are out of money.");
    }

    firstRoll = true;
  }
}

function rollDice() {
  var die1, die2, workSum, showd1, showd2;

  die1 = Math.floor(1 + Math.random() * 6);
  die2 = Math.floor(1 + Math.random() * 6);
  workSum = die1 + die2;

  showd1 = "img/" + die1 + ".bmp";
  showd2 = "img/" + die2 + ".bmp";

  document.craps.firstDie.value = die1;
  document.getElementById("showdie1").src = showd1;
  document.craps.secondDie.value = die2;
  document.getElementById("showdie2").src = showd2;
  document.craps.sum.value = workSum;

  return workSum;
}
