import React from 'react';

const Card = ({ card, onClick }) => {
  const { color, value } = card;

  const colorClasses = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-400',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    wild: 'bg-gray-700 text-white',
  };

  return (
    <div
      className={`card ${colorClasses[color]} text-white p-4 w-16 h-24 flex items-center justify-center rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
