export default function ScoreBoard({ pScore, cScore }) {
  return (
    <div className="scoreBoard">
      <span>Player Score {pScore}</span>
      <span>|</span>
      <span>Computer Score {cScore}</span>
    </div>
  );
}
