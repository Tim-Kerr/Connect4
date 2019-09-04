import React from 'react';
import board from '../assets/board.svg';

const Board: React.FC = () => {
    // const renderColumns = () => {
    //     const columns = [];
    //     for (let i = 0; i < 7; i++) {
    //         columns.push(<div key={i} className='column'>Test</div>);
    //     }
    //     return columns;
    // }

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
            <div className="cols">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <img className='board-img' src={board} alt='' />
        </div>
    );
}

export default Board;