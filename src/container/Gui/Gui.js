import React, { Component } from 'react';
import './index.css';
import Audio from '../../component/shared/Sounds/Sounds';
import HighestScore from '../../component/HighestScore/HighestScore';

class Gui extends Component {
	constructor(props) {
		super(props);
		this.state = { 

		 }
	}

	restart = () => {
		this.props.restart();
	}

	onePlayer = () => {
		this.props.onePlayer();
	}

	twoPlayers = () => {
		this.props.twoPlayers();
	}

	render() { 
		return ( 
			<div className={"Gui"}>
				{this.props.start ? <button className={"Gui__btn"} onClick={this.restart}>RESTART</button> : null}
				<button className={"Gui__btn"} onClick={this.onePlayer}>1 Player</button>
				<button className={"Gui__btn"} onClick={this.twoPlayers}>2 Players</button>
				<Audio />
				<HighestScore score={this.props.score}/>
			</div>
		 );
	}
}
 
export default Gui;