// Challenge 1: Your Age in Days

function ageInDays() {
  var birthYear = prompt('What year were you born... Good friend?');
  var ageInDayss = (2020 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('Your are ' + ageInDayss + ' days old.');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

//Challenge 2: Cate Generator
function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
  div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoise) {
  console.log(yourChoise);
  var humanChoice, botChoise;
  humanChoice = yourChoise.id;

  botChoise = numberToChoise(randToRpsInt());
  results = decideWinner(humanChoice, botChoise); // [1, 0] human won | bot lost / [0.5, 0.5] tie / [0,1] human lost | bot won
  message = finalMessage(results); //{'message:You Won!', 'color:' 'green'}
  console.log(message);
  rpsFrontEnd(yourChoise.id, botChoise, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3)
}

function numberToChoise(number) {
  return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoise, computerChoise) {
  var rpsDatabase = {
    'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
    'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
    'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
  };

  var yourScore = rpsDatabase[yourChoise][computerChoise];
  var computerScore = rpsDatabase[computerChoise][yourChoise];

  return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { 'message': 'You lost!', 'color': 'red' };
  } else if (yourScore === 0.5) {
    return { 'message': 'You tied!', 'color': 'yellow' };
  } else {
    return { 'message': 'You won!', 'color': 'green' };
  }
}

function rpsFrontEnd(humanImageChoise, botImageChoise, finalMessage) {
  var imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
  }

  //lets rmeove all the images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoise] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233,1);'>"
  messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoise] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24,1);'>"

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === 'red') {
    buttonsRed();
  } else if (buttonThingy.value === 'green') {
    buttonsGreen();
  } else if (buttonThingy.value === 'reset') {
    buttonsReset();
  } else if (buttonThingy.value === 'random') {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonsReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {

  let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

//Challenge 5: Blackjack
let blackjackGame = {
  'you': { 'scoreSpan': "#your-blackjack-result", 'div': '#your-box', 'score': 0 },
  'dealer': { 'scoreSpan': "#dealer-blackjack-result", 'div': '#dealer-box', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,
  'standBlock': false
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('/static/sounds/swish.m4a')
const winSound = new Audio('/static/sounds/cash.mp3')
const lossSound = new Audio('/static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    blackjackGame['standBlock'] = true
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';

    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's Play!";
    document.querySelector('#blackjack-result').style.color = "black";

    blackjackGame['turnsOver'] = false;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
    //If adding 11 keeps me bellow 21, add 11. Otherwise add 1.
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }
  else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  if (blackjackGame['standBlock'] === true) {
    blackjackGame['isStand'] = true;

    do {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);
      blackjackGame['standBlock'] = false
      await sleep(750);
    } while (dealerPlays() === false && blackjackGame['isStand'] === true)

    let winner = computeWinner();
    showResult(winner);
    //showResult(computeWinner()); same thing
    await sleep (750);
    blackjackGame['turnsOver'] = true
  }
}

function dealerPlays() {
  if (DEALER['score'] > YOU['score'] || YOU['score'] >= 22 || DEALER['score'] >= 22) {
    blackjackGame['standBlock'] = false
    return true
  } else if (YOU['score'] <= 21 && DEALER['score'] < YOU['score'] || DEALER['score'] == YOU['score'] && DEALER['score'] < 16) {
    return false
  }
}

//compute winner and return who just won
//update the wins, draws and losses
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
    //condition: highter score than the dealer or when dealer busts but you're 21 or under
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      winner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER

    } else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
    }

    //condition: when user busts but dealer doesn't
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER

    //condition: when you AND the dealer busts
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }

  return winner
}

function showResult(winner) {
  let message, messageColor;

  if (winner === YOU) {
    document.querySelector('#wins').textContent = blackjackGame['wins'];
    message = 'You won!'
    messageColor = 'green';
    winSound.play();

  } else if (winner === DEALER) {
    document.querySelector('#losses').textContent = blackjackGame['losses'];
    message = 'You lost!'
    messageColor = 'red';
    lossSound.play();

  } else {
    document.querySelector('#draws').textContent = blackjackGame['draws'];
    message = 'You drew!';
    messageColor = 'black'
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}