import React, { useState } from 'react';
import '../styles/App.css'
import Board from './Board';
import GamePiece from './GamePiece';
import Modal from 'react-responsive-modal';
import { Color } from '../enums/Color';

const Game: React.FC = () => {
  const [gameStart, setGameStart] = useState(false);
  const [turn, setTurn] = useState(Color.NONE);
  const [board, setBoard] = useState<Color[][]>([[], [], [], [], [], [], []]);
  const [turnCount, setTurnCount] = useState(0);


  const startGame = (p1Color: Color) => {
    setGameStart(true);
    setTurn(p1Color);
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
      {gameStart && <Board
        board={board}
        onTurnFinish={(column: number) => {
          board[column].push(turn); // Push the gamepiece onto the column
          setBoard([...board]);
          setTurn((turn === Color.RED) ? Color.BLACK : Color.RED);
          setTurnCount(turnCount + 1);
        }}
        turn={turn} />}
    </div>
  );
}

export default Game;
