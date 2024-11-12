import React, { useState, useEffect } from 'react';
import Deck from './Deck';
import PlayerHand from './PlayerHand';
import Card from './Card';
import { initializeDeck, drawCard, isPlayable, handleSpecialCard } from '../utils/gameLogic';

const GameBoard = () => {
  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [players, setPlayers] = useState([{ hand: [] }, { hand: [] }]);
  const [turn, setTurn] = useState(0);
  const [direction, setDirection] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isChoosingColor, setIsChoosingColor] = useState(false);
  const [chosenColor, setChosenColor] = useState(null);

  useEffect(() => {
    // Initialize the deck and hands for both players
    const initializedDeck = initializeDeck();
    setDeck(initializedDeck);
    setDiscardPile([initializedDeck.pop()]);

    setPlayers([
      { hand: Array.from({ length: 7 }, () => drawCard(initializedDeck)) },
      { hand: Array.from({ length: 7 }, () => drawCard(initializedDeck)) },
    ]);
  }, []);

  const handlePlayCard = (playerIndex, cardIndex) => {
    if (playerIndex !== turn || winner) return;

    const player = players[playerIndex];
    const card = player.hand[cardIndex];
    const topCard = discardPile[discardPile.length - 1];

    if (isPlayable(card, topCard, chosenColor)) {
      setDiscardPile([...discardPile, card]);
      player.hand.splice(cardIndex, 1);
      setPlayers([...players]);

      if (player.hand.length === 0) {
        setWinner(`Player ${playerIndex + 1}`);
        return;
      }

      if (card.color === 'wild' && card.value === '+4') {
        setIsChoosingColor(true);
        return;
      }

      // Apply any special card effects (e.g., skips, reverses)
      let newTurn = handleSpecialCard(card, { players, turn, direction, deck, setDirection });
      setTurn(newTurn !== turn ? newTurn : (turn + direction + players.length) % players.length);
      setChosenColor(null); // Reset chosen color after a valid card play
    } else {
      alert("Card not playable!");
    }
  };

  const handleDrawCard = () => {
    const player = players[turn];
    if (!deck.length) return alert("Deck is empty!");

    player.hand.push(drawCard(deck));
    setPlayers([...players]);

    setTurn((turn + direction + players.length) % players.length);
  };

  const handleColorSelection = (color) => {
    setChosenColor(color);
    setIsChoosingColor(false);

    setTurn((turn + direction + players.length) % players.length);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Uno Game Board</h2>
      {winner ? (
        <h3 className="text-xl font-semibold text-green-600">{winner} wins!</h3>
      ) : (
        <>
          <Deck deck={deck} />
          <div className="discard-pile my-4">
            <h3 className="font-semibold mb-2">Discard Pile</h3>
            {discardPile.length > 0 && (
              <Card card={discardPile[discardPile.length - 1]} chosenColor={chosenColor} />
            )}
          </div>
          {players.map((player, index) => (
            <PlayerHand
              key={index}
              player={player}
              isCurrentPlayer={index === turn}
              onPlayCard={(cardIndex) => handlePlayCard(index, cardIndex)}
            />
          ))}
          <button
            onClick={handleDrawCard}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Draw Card
          </button>
          <p className="mt-4 text-lg">Current Turn: Player {turn + 1}</p>

          {/* Color Selection Modal */}
          {isChoosingColor && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Choose a Color</h3>
                <div className="flex justify-around">
                  {['red', 'yellow', 'green', 'blue'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelection(color)}
                      className={`w-16 h-16 rounded-full bg-${color}-500 hover:scale-105 transform transition`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
