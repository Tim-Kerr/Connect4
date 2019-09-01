import React, { useState } from 'react';
import '../styles/App.css'
import Board from './Board';
import Modal from 'react-responsive-modal';
import { Color } from '../enums/Color';

const Game: React.FC = () => {
  const [gameStart, setGameStart] = useState(false);

  const startGame = (p1Color: Color) => {
    setGameStart(true);
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
      {gameStart && <Board />}
    </div>
  );
}

export default Game;
