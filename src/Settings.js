import React, { Component } from 'react';
import Audio from './Sounds';
import HighestScore from './HighestScore';

class Settings extends Component {
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
			<div className={"Settings"}>
				{this.props.start ? <button className={"__btn --restart"} onClick={this.restart}>RESTART</button> : null}
				<button className={"__btn --onePlayer"} onClick={this.onePlayer}>1 Player</button>
				<button className={"__btn --twoPlayers"} onClick={this.twoPlayers}>2 Players</button>
				<Audio />
				<HighestScore score={this.props.score}/>
			</div>
		 );
	}
}
 
export default Settings;