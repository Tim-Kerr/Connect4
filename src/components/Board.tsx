import React from 'react';
import board from '../assets/board.png';

const Board: React.FC = () => {
    return (
        <img className='board' src={board} alt='' />
    );
}

export default Board;