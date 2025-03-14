import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const fetchDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(fetchDetails).then((pokemonData) => {
          setCards(pokemonData);
        });
      });
  }, []);

  const shuffleCards = () => {
    setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (id) => {
    if (clickedCards.has(id)) {
      setScore(0);
      setClickedCards(new Set());
    } else {
      setClickedCards((prev) => new Set(prev).add(id));
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) setBestScore(newScore);
        return newScore;
      });
    }
    shuffleCards();
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <h2>Score: {score} | Best Score: {bestScore}</h2>
      <div className="card-container">
        {cards.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;