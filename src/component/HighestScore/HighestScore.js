import React, { Component } from 'react';
import './index.css';

class HighestScore extends Component {
	state = {
		best: localStorage.getItem('tetris-rjs-best') ? localStorage.getItem('tetris-rjs-best') : [ 0, 0, 0 ]
	};

	render() {
		let score = this.props.score;

		let best = this.state.best;

		if (typeof best === 'string') best = best.split(',');

		if (score > best[0]) {
			best[2] = best[1];
			best[1] = best[0];
			best[0] = score;

			localStorage.setItem('tetris-rjs-best', best);
		} else if (score > best[1]) {
			best[2] = best[1];
			best[1] = score;

			localStorage.setItem('tetris-rjs-best', best);
		} else if (score > best[2]) {
			best[2] = score;

			localStorage.setItem('tetris-rjs-best', best);
		}

		best = best.map((i, key) => {
			return (
				<div key={key} className={'HighestScore__place'}>
					{i}
				</div>
			);
		});

		return (
			<div className={'HighestScore'}>
				<h3>Best Scores</h3>
				{best}
			</div>
		);
	}
}

export default HighestScore;
