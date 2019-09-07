import React, { useEffect, useState } from 'react';
import board from '../assets/board.svg';
import SVG from 'svg.js';
import { Color } from '../enums/Color';
import addPercentages from '../util/addPercentages';
import percentToNumber from '../util/percentToNumber';

interface IBoardProps {
    turn: Color;
    onTurnChange: Function;
}

const Board: React.FC<IBoardProps> = (props) => {
    let [svg, setSvg] = useState<SVG.Doc | null>();
    let [board, setBoard] = useState<SVG.Rect | null>();
    const [columnBoundaries, setColumnBoundaries] = useState<SVG.Rect[]>();
    const [columns, setColumns] = useState<SVG.Circle[][]>([]);
    const [dropping, setDropping] = useState(false);
    const [lastCol, setLastCol] = useState<SVG.Rect>();

    const createGamepiece = (svg: SVG.Doc | null | undefined, board: SVG.Rect | null | undefined): SVG.Circle | null => {
        if (svg && board) {
            let cx = 13;
            if (lastCol) {
                const x = percentToNumber(lastCol.attr('x'));
                const width = percentToNumber(lastCol.attr('width'));
                cx = x + (width / 2);
            }

            return svg.circle()
                // .before(board)
                .attr({ r: '5%', cx: `${cx}%`, cy: '7%' })
                .fill((props.turn === Color.BLACK ? 'black' : 'red'))
                .stroke({ color: 'black' })
                .data('color', props.turn) as SVG.Circle;
        }

        return null;
    }

    const setupColumnListeners = (col: SVG.Rect, gamepiece: SVG.Circle | null) => {
        //@ts-ignore
        col.mouseover(null);
        //@ts-ignore
        col.click(null);

        // Mousing over a column moves the game piece over that column
        col.mouseover(() => {
            if (!dropping && gamepiece) {
                const x = percentToNumber(col.attr('x'));
                const width = percentToNumber(col.attr('width'));
                const cx = x + (width / 2) + 0.5;
                gamepiece.attr({ cx: `${cx}%` });
            }
            setLastCol(col);
        });

        // Drop the game piece into the column
        col.on('click', () => {
            if (!dropping && gamepiece) {
                let column = columns[col.data('index')];
                if (!column) {
                    column = [];
                    columns[col.data('index')] = column;
                }

                // If the column has space, drop the piece into the column
                if (column.length < 6) {
                    gamepiece.animate(500)
                        .attr({ cy: `${(12.5 * (6 - column.length)) + 14}%` })
                        .after(() => {
                            // Switch turns
                            setDropping(false);
                            props.onTurnChange();
                        });

                    column.push(gamepiece);

                    setDropping(true);
                }
            }
        });
    }

    // Render the SVG board
    useEffect(() => {
        svg = SVG('svg').size(600, 500);

        board = svg.rect(0, 0).fill({ color: '#2b7cff' }).attr({ width: '100%', height: '100%', y: '15%' }).id('board');
        const maskRect = svg.rect(0, 0).fill('white').attr({ width: '100%', height: '100%' });
        const mask = svg.mask().add(maskRect)
        board.maskWith(mask);

        const gamepiece = createGamepiece(svg, board);


        for (let i = 0; i < 42; i++) {
            const maskCircle = svg.circle(50).fill('black').attr({ r: '5%', cx: `${12.5 * ((i % 7) + 1)}%`, cy: `${(12.5 * (Math.floor(i / 7) + 1)) + 14}%` });
            mask.add(maskCircle);
        }

        const cols: SVG.Rect[] = [];

        // Render columns
        for (let i = 0; i < 7; i++) {
            let x;
            if (i === 0) x = '6.5%'
            else x = `${(12.428 * i) + 6.5}%`

            const col = svg.rect(0, 0).attr({ width: '12.428%', height: '100%', x }).fill({ opacity: 0 });
            col.data('index', i);
            cols.push(col);

            setupColumnListeners(col, gamepiece);
            setColumnBoundaries(cols);
        }

        setBoard(board);
        setSvg(svg);
    }, []);

    useEffect(() => {
        if (columnBoundaries) {
            const gamepiece = createGamepiece(svg, board);
            columnBoundaries.forEach(col => {
                setupColumnListeners(col, gamepiece);
            });
        }
    }, [props.turn]);

    return (
        <div className='board'>
            <div id='svg' />
        </div>
    );
}

export default Board;