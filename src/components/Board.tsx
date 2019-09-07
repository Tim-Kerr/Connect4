import React, { useState, useEffect } from 'react';
import board from '../assets/board.svg';
import { Color } from '../enums/Color';

interface IBoardProps {
    board: Color[][];
    turn: Color;
    onTurnFinish: (column: number) => void;
}

const Board: React.FC<IBoardProps> = (props) => {
    const [focusedColumnIndex, setFocusedColumnIndex] = useState(0);

    const currentColor = (props.turn === Color.RED) ? 'red' : 'black';

    const renderTopRow = () => {
        const topRow = [];
        for (let i = 0; i < 7; i++) {
            topRow.push(<div key={i} style={{ backgroundColor: (focusedColumnIndex === i) ? currentColor : 'white' }} />);
        }
        return topRow;
    }

    const renderSlots = () => {
        const slots = [];
        for (let i = 0; i < 42; i++) {
            const column = board[i % 7];
            const slot = props.board[i % 7][Math.floor(i / 7)];
            let color;
            if (slot) {
                color = (slot === Color.RED) ? 'red' : 'black';
            }
            else {
                color = 'white';
            }

            slots.push(
                <div className='column'
                    key={i}
                    onMouseOver={() => {
                        setFocusedColumnIndex(i % 7);
                    }}
                    onClick={() => {
                        // Drop the gamepiece into the column if there is room
                        if (column.length < 6) {
                            props.onTurnFinish(i % 7);
                        }
                    }}
                    style={{ backgroundColor: color }}
                />);
        }
        return slots;
    }

    return (
        <div>
            <div className='topRow'>
                {renderTopRow()}
            </div>
            <div className='board'>
                {renderSlots()}
            </div>
        </div>
    );
}

export default Board;