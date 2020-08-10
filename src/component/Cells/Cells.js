import React, { Component } from 'react';
import './index.css';

class Cells extends Component {
    render() { 
		let { board, WIDTH, HEIGHT, gameOver } = this.props;

        let boardDraw = [];

        if(board[0] !== undefined){

            for (let i = 4; i < HEIGHT; i++) {
                for (let j = 0; j < WIDTH; j++) {
                    boardDraw[i * WIDTH + j] = board[i][j].type;
                }
            }

            boardDraw = boardDraw.map((i, key) => {
                return <div className={'Board__cell Board__cell--' + i} key={key} />;
            });
        }

        return ( <React.Fragment>{!gameOver ? boardDraw : null}</React.Fragment> );
    }
}
 
export default Cells;