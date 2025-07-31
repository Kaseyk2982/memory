import Card from "./Card";

export default function CardList({ cards, handleFlip }) {
  return (
    <div className="cardList">
      {cards.map((card) => (
        <Card handleFlip={handleFlip} key={card.id} card={card} />
      ))}
    </div>
  );
}
