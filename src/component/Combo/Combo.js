import React, { Component } from 'react';
import './index.css';

class Combo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			combo: 1,
			comboDraw: null
		};
	}

	drawCombo = () => {
		this.setState(
			{
				comboDraw: null
			},
			() => {
				let combo = this.state.combo;
				
				if(combo > 1.3){
					let text = ' x' + combo;
					this.setState({
						comboDraw: (
							<span className={'Combo'}>
								{text}
							</span>
						)
					})
				}
			}
		);
	};



	componentDidUpdate(prevProps, prevState) {
		if (prevProps.combo / 1 !== prevState.combo / 1) {
			let combo = prevProps.combo;

			this.setState({ combo: combo }, this.drawCombo());
		}
	}

	render() {
		return this.state.comboDraw;
	}
}

export default Combo;
