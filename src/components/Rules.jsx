export default function Rules({ setIsStartGame }) {
  return (
    <div className="rulesContainer">
      <h2>Rules</h2>
      <p>
        In this game of Memory you will be competing against the computer. After
        clicking the start game button you will see a 4 x 3 grid of cards. The
        object is to find all the card matches. You will take turns with the
        computer flipping over 2 cards at a time, if the cards are a match you
        will get 2 points and continue to flip 2 more cards until you dont get a
        match. Its now the computers turn to flip 2 cards to see if it can find
        a match etc. The one with the most points after all the matches are
        found wins the game. <br />
        <span>
          <strong>Good Luck!</strong>
        </span>
      </p>
      <button
        onClick={() => setIsStartGame((isStartGame) => !isStartGame)}
        className="startButton"
      >
        START GAME!
      </button>
    </div>
  );
}
