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

  /**
   * Detects if a player has won the game
   * 
   * Checks the surrounding board relative to the last piece played.
   * 
   * @param color: The last color played
   * @param column: The column last played
   */
  const didWin = (color: Color, column: number): boolean => {
    // Check vertical win
    if (check(x => x, y => y + 1, color, column) + check(x => x, y => y - 1, color, column) >= 3) {
      return true;
    }

    // Check horizontal win
    if (check(x => x + 1, y => y, color, column) + check(x => x - 1, y => y, color, column) >= 3) {
      return true;
    }

    // Check up and to the right diagonal 
    if (check(x => x + 1, y => y + 1, color, column) + check(x => x - 1, y => y - 1, color, column) >= 3) {
      return true;
    }

    // Check down and to the left diagonal
    if (check(x => x - 1, y => y + 1, color, column) + check(x => x + 1, y => y - 1, color, column) >= 3) {
      return true;
    }

    return false;
  }

  const check = (xTraveralFunc: (x: number) => number, yTraversalFunc: (y: number) => number, color: Color, column: number): number => {
    let count = 0;
    let x = column;
    let y = board[x].length - 1;
    for (let i = 0; i < 3; i++) {
      x = xTraveralFunc(x);
      y = yTraversalFunc(y);

      if (x >= board.length || x < 0) break;
      if (y >= board[x].length || y < 0) break;

      if (board[x][y] === color) count++;
    }

    return count;
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
            setWinner(Color.NONE);
          }}>Ok</button>
        </Modal>}

      {gameStart &&
        <Board
          board={board}
          onTurnFinish={(column: number) => {
            board[column].push(turn); // Push the gamepiece onto the column
            setBoard([...board]);
            setTurn((turn === Color.RED) ? Color.BLACK : Color.RED);
            setTurnCount(turnCount + 1);

            if (didWin(turn, column)) {
              setWinner(turn);
              setGameEnd(true);
            }
          }}
          turn={turn} />}
    </div>
  );
}

export default Game;
