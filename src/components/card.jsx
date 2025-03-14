/*help me create a card.jsx file where we handle the click 
of the card and return a container with the images*/

import React from "react";

const Card = ({ pokemon, handleCardClick }) => {
  if (!pokemon || !pokemon.sprites) return null; // Prevents errors if data is undefined

  return (
    <div className="card" onClick={() => handleCardClick(pokemon.id)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
};

export default Card;