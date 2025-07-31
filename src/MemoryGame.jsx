import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import Results from "./components/Results";
import Rules from "./components/Rules";
import CardList from "./components/CardList";
import { delay } from "./utils/asyncUtils";
import { shuffleCards } from "./utils/gameUtils";

export default function MemoryGame({ initialCards }) {
  const [cards, setCards] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedCards, setMatchedCards] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [isStartGame, setIsStartGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const availableCardsRef = useRef(availableCards);
  const computerScoreRef = useRef(computerScore);

  useEffect(() => {
    availableCardsRef.current = availableCards;
    computerScoreRef.current = computerScore;
  }, [availableCards, computerScore]);

  useEffect(() => {
    const shuffledCards = shuffleCards(initialCards);
    setCards(shuffledCards);
    setAvailableCards(shuffledCards);
  }, []);

  async function handleFlip(id) {
    if (
      isLocked ||
      flippedIds.length >= 2 ||
      cards.find((c) => c.id === id).flipped ||
      isGameOver
    ) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    if (newFlippedIds.length === 2) {
      setIsLocked(true);
      const [firstId, secondId] = newFlippedIds;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard.value === secondCard.value) {
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
        setAvailableCards((prevCards) =>
          prevCards.filter(
            (c) => c.id !== firstCard.id && c.id !== secondCard.id
          )
        );

        setPlayerScore(playerScore + 2);
        setFlippedIds([]);
        setIsLocked(false);
        await delay(1000);
        if (availableCardsRef.current < 2) {
          setIsGameOver(true);
          return;
        }
      } else {
        await delay(2000);
        setCards((prevCards) =>
          prevCards.map((c) =>
            (c.id === firstId || c.id === secondId) &&
            !matchedCards.some((mc) => mc.id === c.id)
              ? { ...c, flipped: false }
              : c
          )
        );
        setFlippedIds([]);
        setIsLocked(true);
        await delay(2000);
        await handleComputerTurn();
      }
    }
  }

  async function handleComputerTurn() {
    setIsLocked(true);
    if (isGameOver) {
      return;
    }

    const indices = Array.from(
      { length: availableCardsRef.current.length },
      (_, i) => i
    );
    const firstIndex = indices[Math.floor(Math.random() * indices.length)];
    const remainingIndices = indices.filter((i) => i !== firstIndex);
    const secondIndex =
      remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
    const computerFirstCard = availableCardsRef.current[firstIndex];
    const computerSecondCard = availableCardsRef.current[secondIndex];

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === computerFirstCard.id ? { ...c, flipped: true } : c
      )
    );
    await delay(1000);

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === computerSecondCard.id ? { ...c, flipped: true } : c
      )
    );

    setFlippedIds([computerFirstCard.id, computerSecondCard.id]);
    setIsLocked(true);

    if (computerFirstCard.value === computerSecondCard.value) {
      availableCardsRef.current = availableCardsRef.current.filter(
        (c) => c.id !== computerFirstCard.id && c.id !== computerSecondCard.id
      );

      setAvailableCards(availableCardsRef.current);

      setMatchedCards((prev) => [
        ...prev,
        computerFirstCard,
        computerSecondCard,
      ]);

      computerScoreRef.current = computerScoreRef.current + 2;
      setComputerScore(computerScoreRef.current);

      setFlippedIds([]);
      setIsLocked(false);
      if (availableCardsRef.current.length < 2) {
        setIsGameOver(true);
        setIsLocked(false); // Unlock if the computer can't play
        return;
      }
      await delay(3000);
      handleComputerTurn();
    } else {
      await delay(2000);
      setCards((prevCards) =>
        prevCards.map((c) =>
          (c.id === computerFirstCard.id || c.id === computerSecondCard.id) &&
          !matchedCards.some((mc) => mc.id === c.id) // Only unflip if not already matched
            ? { ...c, flipped: false }
            : c
        )
      );
      setFlippedIds([]);
      setIsLocked(false);
    }
  }

  function handleReset() {
    const shuffledCards = shuffleCards(initialCards);
    setCards(shuffledCards);
    setAvailableCards(shuffledCards);
    setFlippedIds([]);
    setMatchedCards([]);
    setPlayerScore(0);
    setComputerScore(0);
    setIsLocked(false);
    setIsStartGame(false);
    setIsGameOver(false);
  }

  return (
    <div className="gameContainer">
      <Header>
        <ScoreBoard pScore={playerScore} cScore={computerScore} />
      </Header>
      {isGameOver ? (
        <Results
          handleReset={handleReset}
          playerScore={playerScore}
          computerScore={computerScore}
        />
      ) : null}

      {!isStartGame ? (
        <Rules setIsStartGame={setIsStartGame} />
      ) : (
        <CardList cards={cards} handleFlip={handleFlip} />
      )}
    </div>
  );
}
