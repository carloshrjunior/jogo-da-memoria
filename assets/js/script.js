const FRONT = 'card_front'; // constante para manipular a frente da carta
const BACK = 'card_back'; // constante para manipular o verso da carta
const CARD = 'card'; // constante que armazena a classe 'card'
const ICON = 'icon'; // constante que armazena a classe 'icon'
const FLIP = 'flip'; // constante que armazena a classe 'flip'

startGame();

function startGame() {
  // armazena o array de cartas na variável cards
  initializeCards(game.createCardsFromTechs());
}

// função para tranformar o array de cartas em algo visual
function initializeCards(cards) {
  let gameBoard = document.querySelector('#gameBoard');
  gameBoard.innerHTML = '';
  game.cards.forEach( (card) => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);

    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

// função para criar a frente e o verso da carta
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

// função para criar a frente e o verso de cada carta
function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if(face === FRONT) {
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = `./assets/img/${card.icon}.png`;
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = '&lt/&gt';
  }

  element.appendChild(cardElementFace);
}

// função para virar a carta
function flipCard() {
  
  if(game.setCard(this.id)) {
    this.classList.add(FLIP);
    if(game.secondCard){
      if(game.checkMatch()) {
        game.clearCards();
        if(game.checkGameOver()) {
          let gameOverLayer = document.querySelector('#gameOver');
          gameOverLayer.style.display = 'flex';
        }
      } else {
        setTimeout( () => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          
          firstCardView.classList.remove(FLIP);
          secondCardView.classList.remove(FLIP);
  
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

// função para recomeçar o jogo
function restart() {
  game.clearCards();
  startGame();

  let gameOverLayer = document.querySelector('#gameOver');
  gameOverLayer.style.display = 'none';
}