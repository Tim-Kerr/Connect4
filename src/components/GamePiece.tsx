import React from 'react';
import { Color } from '../enums/Color';

interface IGamePieceProps {
    color: Color;
}

const GamePiece: React.FC<IGamePieceProps> = (props) => {
    return (
        <div className='gamepiece'>
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
            </svg>
        </div>
    );
}

export default GamePiece;