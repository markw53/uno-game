import React from 'react';
import Card from './Card';

const PlayerHand = ({ player, isCurrentPlayer, onPlayCard }) => {
  return (
    <div className={`player-hand my-4 p-4 rounded-lg ${isCurrentPlayer ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
      <h3 className="font-semibold mb-2 text-lg">{isCurrentPlayer ? "Your Hand" : "Opponent's Hand"}</h3>
      <div className="flex flex-wrap gap-2">
        {player.hand.map((card, index) => (
          <Card key={index} card={card} onClick={() => isCurrentPlayer && onPlayCard(index)} />
        ))}
      </div>
    </div>
  );
};

export default PlayerHand;
