export default function Card({ card, handleFlip }) {
  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""}`}
      onClick={() => handleFlip(card.id)}
    >
      <div className="cardInner">
        <div className="cardFront">{card.value}</div>
        <div className="cardBack"></div>
      </div>
    </div>
  );
}
