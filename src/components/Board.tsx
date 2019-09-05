import React, { useEffect } from 'react';
import board from '../assets/board.svg';
import SVG from 'svg.js';

const Board: React.FC = () => {
    console.log('entering board')
    // const renderColumns = () => {
    //     const columns = [];
    //     for (let i = 0; i < 7; i++) {
    //         columns.push(<div key={i} className='column'>Test</div>);
    //     }
    //     return columns;
    // }

    useEffect(() => {
        console.log('useEffect ran');
        const svg = SVG('svg').size(600, 500);
        const rect = svg.rect(600, 500).fill({ color: '#2b7cff' });
        const circle = svg.circle(50).fill('black').attr({ r: '5%', cx: '8%', cy: '8%' });
        const maskRect = svg.rect(0, 0).fill('white').attr({ width: '100%', height: '100%' });
        const mask = svg.mask().add(maskRect).add(circle);
        rect.maskWith(mask);

    });


    return (
        // <div>
        //      <div className='columns'>
        //         {renderColumns()}
        //     </div>
        //     <div className='board'>
        //         <img className='board-img' src={board} alt='' />
        //     </div>
        // </div>

        <div className='board'>
            <div id='svg' />
            {/* <div className="cols">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div> */}
            {/* <img className='board-img' src={board} alt='' /> */}
        </div>
    );
}

export default Board;