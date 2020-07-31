import React, {Component} from 'react';

class GameOver extends Component {
    render() { 
        let { gameOver } = this.props;
        return ( gameOver ? <div className={'__GameOver'}>GAME <br/> OVER</div> : null);
    }
}
 
export default GameOver;