let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  cards: null,
  techs: ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'],
    
  setCard: function(id) {
    let card = this.cards.filter(card => card.id === id)[0];
    if(card.flipped || this.lockMode) {
      return false;
    }

    if(!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },
  checkMatch: function () {
    if(!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },
  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },
  checkGameOver: function() {
    return this.cards.filter(card => !card.flipped).length == 0;
  },
  // função para criar as cartas
  createCardsFromTechs: function () {
    this.cards = [];

    this.techs.forEach( (tech) => {
      // adiciona cada carta dentro de um novo array
      // cada elemento desse array é um array de duas posições (par de cada carta)
      this.cards.push(this.createPairFromTech(tech)); 
    });

    // -----------------------------------------------
    // array resultante do for:                      
    // console.log(cards);                           
    // -----------------------------------------------
    // array final:                                  
    // console.log(cards.flatMap(pair => pair));     
    // -----------------------------------------------

    // desmembra o array e coloca todos os pares juntos em um único array,
    // que antes era formado por arrays de duas posições; cada array duplo era um par de uma tecnologia
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
  },
  // função para criar os pares das cartas
  createPairFromTech: function (tech) {
    // retorna dois objetos que são cada par de cada tecnologia(carta)
    return [{
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false
    }, {
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false
    }];
  },
  // função para criar um ID randômico para cada carta
  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },
  // função para embaralhar as cartas
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // 'último' elemento troca de posição com elemento aleatório
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }
}