import React, { useEffect } from 'react';
import board from '../assets/board.svg';
import SVG from 'svg.js';
import { Color } from '../enums/Color';

interface IBoardProps {
    turn: Color;
}

const Board: React.FC<IBoardProps> = (props) => {

    // Render the SVG board
    useEffect(() => {
        const svg = SVG('svg').size(600, 500);

        const rect = svg.rect(0, 0).fill({ color: '#2b7cff' }).attr({ width: '100%', height: '100%' });
        const maskRect = svg.rect(0, 0).fill('white').attr({ width: '100%', height: '100%' });
        const mask = svg.mask().add(maskRect)
        rect.maskWith(mask);

        const gamePiece = svg.circle().attr({ r: '6.214%' }).fill((props.turn === Color.BLACK ? 'black' : 'red'));

        for (let i = 0; i < 42; i++) {
            const maskCircle = svg.circle(50).fill('black').attr({ r: '5%', cx: `${12.5 * ((i % 7) + 1)}%`, cy: `${14 * (Math.floor(i / 7) + 1)}%` });
            mask.add(maskCircle);
        }

        const cols = [];

        for (let i = 0; i < 7; i++) {
            let x;
            if (i === 0) x = '6.5%'
            else x = `${(12.428 * i) + 6.5}%`

            const col = svg.rect(0, 0).attr({ width: '12.428%', height: '100%', x }).fill({ opacity: 0.5 });
            col.on('mouseover', () => {
                col.fill('green').opacity(1);

            });
            col.on('mouseout', () => col.fill('red').opacity(0));
            col.on('click', () => console.log('DROP!!'));
            cols.push(col);
        }
    }, []);


    return (
        <div className='board'>
            <div id='svg' />
        </div>
    );
}

export default Board;