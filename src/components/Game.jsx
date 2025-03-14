import Card from '../Card/Card.js';
import React, { useContext } from 'react';
import './Game.css';
import Loading from '../Loading/Loading.js';
import GameContext from '../../context/GameContext.js';
import GameOver from '../GameOver/GameOver.js';

export default function Game() {
  const { isGameOver, isGameWon, cards } = useContext(GameContext);

  return (
    <div id="gameWrapper">
      {isGameOver !== true && isGameWon !== true ? (
        <div className="gameContainer">
          {cards !== null && cards !== undefined ? (
            cards.map((card) => <Card info={card} key={card.id} />)
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <GameOver />
      )}
    </div>
  );
}