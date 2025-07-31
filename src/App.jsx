import "./index.css";
import MemoryGame from "./MemoryGame";

function App() {
  return (
    <>
      <MemoryGame initialCards={initialCards} />
    </>
  );
}

export default App;

const initialCards = [
  { id: 1, value: "💎", flipped: false },
  { id: 2, value: "💎", flipped: false },
  { id: 3, value: "🎲", flipped: false },
  { id: 4, value: "🎲", flipped: false },
  { id: 5, value: "🧲", flipped: false },
  { id: 6, value: "🧲", flipped: false },
  { id: 7, value: "💰", flipped: false },
  { id: 8, value: "💰", flipped: false },
  { id: 9, value: "🎃", flipped: false },
  { id: 10, value: "🎃", flipped: false },
  { id: 11, value: "🚀", flipped: false },
  { id: 12, value: "🚀", flipped: false },
];
