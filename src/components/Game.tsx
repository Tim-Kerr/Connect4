import React, { useState } from 'react';
import '../styles/App.css'
import Board from './Board';
import Modal from 'react-responsive-modal';
import { Color } from '../enums/Color';

const Game: React.FC = () => {
  const [gameStart, setGameStart] = useState(false);
  const [turn, setTurn] = useState(Color.NONE);
  const [board, setBoard] = useState<Color[][]>([[], [], [], [], [], [], []]);
  const [turnCount, setTurnCount] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState(Color.NONE);

  const startGame = (p1Color: Color) => {
    setGameStart(true);
    setTurn(p1Color);
  }

  // Tie. End the game.
  if (!gameEnd && turnCount === 42 && winner === Color.NONE) {
    setGameEnd(true);
  }

  const detectWin = (): Color => {

    return Color.NONE;
  }

  return (
    <div className="App">
      <Modal
        open={!gameStart}
        onClose={() => { }}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        showCloseIcon={false}
      >
        <h1>Player 1 - Choose a color</h1>
        <button onClick={() => startGame(Color.RED)}>Red</button>
        <button onClick={() => startGame(Color.BLACK)}>Black</button>
      </Modal>

      {gameEnd &&
        <Modal
          open={gameEnd}
          onClose={() => { }}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          showCloseIcon={false}
        >
          {(winner !== Color.NONE) &&
            <h1>
              {(winner === Color.RED) ? 'Red' : 'Black'} Player Wins!
            </h1>}

          {(winner === Color.NONE) &&
            <h1>Tie Game!</h1>
          }

          <button onClick={() => {
            setBoard([[], [], [], [], [], [], []]);
            setTurnCount(0);
            setGameEnd(false);
            setGameStart(false);
          }}>Ok</button>
        </Modal>}

      {gameStart && !gameEnd &&
        <Board
          board={board}
          onTurnFinish={(column: number) => {
            board[column].push(turn); // Push the gamepiece onto the column
            setBoard([...board]);
            detectWin();
            setTurn((turn === Color.RED) ? Color.BLACK : Color.RED);
            setTurnCount(turnCount + 1);
          }}
          turn={turn} />}
    </div>
  );
}

export default Game;
