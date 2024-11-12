// gameLogic.js

export const initializeDeck = () => {
  const colors = ['red', 'yellow', 'green', 'blue'];
  const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', '+2'];
  const deck = [];

  colors.forEach((color) => {
    values.forEach((value) => {
      deck.push({ color, value });
      if (value !== '0') deck.push({ color, value });
    });
  });

  // Add wild cards
  for (let i = 0; i < 4; i++) {
    deck.push({ color: 'wild', value: 'wild' });
    deck.push({ color: 'wild', value: '+4' });
  }

  // Shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

export const drawCard = (deck) => deck.pop();

export const isPlayable = (card, topCard, chosenColor = null) => {
  const activeColor = chosenColor || topCard.color;
  return (
    card.color === activeColor ||
    card.value === topCard.value ||
    card.color === 'wild'
  );
};

// Handle special card effects
export const handleSpecialCard = (card, state) => {
  const { players, turn, direction } = state;
  let newTurn = turn;

  switch (card.value) {
    case 'skip':
      newTurn = (turn + direction + players.length) % players.length;
      break;
    case 'reverse':
      state.direction *= -1;
      break;
    case '+2':
      drawCards(state.deck, players[(turn + direction) % players.length].hand, 2);
      break;
    case '+4':
      drawCards(state.deck, players[(turn + direction) % players.length].hand, 4);
      break;
    default:
      break;
  }

  return newTurn;
};

// Draw a specified number of cards for a player
export const drawCards = (deck, hand, count = 1) => {
  for (let i = 0; i < count; i++) {
    hand.push(drawCard(deck));
  }
};
