import React, { Component } from 'react';
import './index.css';

class Pause extends Component {

    render() { 
        return ( !this.props.gameOver && this.props.pause ? <div className={'__Pause'}>PAUSE</div> : null );
    }
}
 
export default Pause;