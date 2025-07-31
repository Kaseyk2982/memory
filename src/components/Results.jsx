export default function Results({ playerScore, computerScore, handleReset }) {
  return (
    <div className="result">
      {playerScore > computerScore && <h2 className="winResult">You Win!</h2>}
      {playerScore < computerScore && <h2 className="loseResult">You Lose</h2>}
      {playerScore === computerScore && (
        <h2 className="tieResult">Its a Tie</h2>
      )}
      <button onClick={handleReset} className="resetButton">
        Play Again
      </button>
    </div>
  );
}
