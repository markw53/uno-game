import React from 'react';
import GameBoard from './components/GameBoard';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Uno Game</h1>
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
