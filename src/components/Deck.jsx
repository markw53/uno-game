import React from 'react';

const Deck = ({ deck }) => {
  return (
    <div className="deck my-4 p-4 border rounded-lg shadow-md text-center bg-gray-200">
      <h3 className="font-semibold">Deck</h3>
      <p>Cards Remaining: {deck.length}</p>
    </div>
  );
};

export default Deck;
