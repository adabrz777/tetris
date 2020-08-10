import React, { Component } from 'react';
import './index.css';
import GameOver from '../../component/GameOver/GameOver';
import Pause from '../../component/Pause/Pause';
import Score from '../../component/Score/Score';
import Next from '../../component/Next/Next';
import Cells from '../../component/Cells/Cells';
import {Sound} from '../../component/shared/Sounds/Sounds';

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			WIDTH: 10,
			HEIGHT: 24,

			//board
			board: [],

			//active block
			active: null,

			//available block types
			TYPES: [ 'O', 'I', 'T', 'Z', 'S', 'L', 'J', 'D' ],

			//actual active block's type
			activeType: 'O',

			//next active types tab
			next: [],

			//is game lose?
			gameOver: false,

			//is any key pressed?
			last_key: null,
			landing_time: 5,

			//should active block move
			should_move: 0,

			//players keys code
			btns: {
				up: this.props.btns[0],
				down: this.props.btns[1],
				left: this.props.btns[2],
				right: this.props.btns[3],
				skip: this.props.btns[4],
				rotate: this.props.btns[5],
				pause: this.props.btns[6]
			},

			//active keys
			keysPressed: this.props.keysPressed,

			//should handle key?
			if_can_handle: 0,

			//player points
			score: 0,

			//player combo
			combo: 1,
		};
	}

	//function generates random number from 'a' to 'b'
	rand = (a, b) => {
		return Math.floor(Math.random() * (b - a + 1) + a);
	};

	//function generates starting values for player
	//also starts intervals
	start = () => {
		let { board, HEIGHT, WIDTH, next, TYPES } = this.state;

		for (let i = 0; i < HEIGHT; i++) {
			board[i] = [];
		}

		for (let i = 0; i < HEIGHT; i++) {
			for (let j = 0; j < WIDTH; j++) {
				board[i][j] = { x: j, y: i, type: 'E', stay: false };
			}
		}

		for (let i = 0; i < 3; i++) {
			next[i] = TYPES[this.rand(0, TYPES.length - 1)];
		}

		this.interval1 = setInterval(() => {
			let if_can_handle = this.state.if_can_handle;

			if (if_can_handle > 0) {
				if_can_handle--;
			}

			if (if_can_handle < 0) {
				if_can_handle = 0;
			}

			this.setState({
				if_can_handle: if_can_handle
			});
		}, 50);

		this.interval2 = setInterval(() => {
			let if_can_handle = this.state.if_can_handle;
			let keysPressed = this.state.keysPressed;
			let btns = this.state.btns;

			if (
				!if_can_handle &&
				(keysPressed[btns.left] ||
					keysPressed[btns.right] ||
					keysPressed[btns.up] ||
					keysPressed[btns.down] ||
					keysPressed[btns.skip] ||
					keysPressed[btns.rotate] ||
					keysPressed[btns.pause])
			) {
				if_can_handle = 3;
				this.handleKey();
			}

			this.setState({
				if_can_handle: if_can_handle
			});
		}, 10);

		this.generateNextActive();

		this.setState(
			{
				board: board,
				next: next
			},
			() => {
				this.frame();
			}
		);
	};

	//function checks if player lost
	if_lose = () => {
		let board = this.state.board;

		for (let i = 0; i < this.state.WIDTH; i++) {
			if (board[3][i].stay === true) {
				return true;
			}
		}

		return false;
	};

	//function checks if active block can move down
	if_touch = () => {
		let { board, HEIGHT, active } = this.state;

		if (
			active[0].y === HEIGHT - 1 ||
			active[1].y === HEIGHT - 1 ||
			active[2].y === HEIGHT - 1 ||
			active[3].y === HEIGHT - 1 ||
			board[active[0].y + 1][active[0].x].stay === true ||
			board[active[1].y + 1][active[1].x].stay === true ||
			board[active[2].y + 1][active[2].x].stay === true ||
			board[active[3].y + 1][active[3].x].stay === true
		)
			return true;

		return false;
	};

	//function checks if active block can move right
	if_touch_left = () => {
		let { board, active } = this.state;

		if (
			active[0].x === 0 ||
			active[1].x === 0 ||
			active[2].x === 0 ||
			active[3].x === 0 ||
			board[active[0].y][active[0].x - 1].stay === true ||
			board[active[1].y][active[1].x - 1].stay === true ||
			board[active[2].y][active[2].x - 1].stay === true ||
			board[active[3].y][active[3].x - 1].stay === true
		) {
			return true;
		}

		return false;
	};

	//function checks if active block can move left
	if_touch_right = () => {
		let { board, active, WIDTH } = this.state;

		if (
			active[0].x === WIDTH - 1 ||
			active[1].x === WIDTH - 1 ||
			active[2].x === WIDTH - 1 ||
			active[3].x === WIDTH - 1 ||
			board[active[0].y][active[0].x + 1].stay === true ||
			board[active[1].y][active[1].x + 1].stay === true ||
			board[active[2].y][active[2].x + 1].stay === true ||
			board[active[3].y][active[3].x + 1].stay === true
		) {
			return true;
		}

		return false;
	};

	//function generates next active block
	generateNextActive = () => {
		let { next, board, TYPES } = this.state;

		let activeType = next[0];

		next[0] = next[1];
		next[1] = next[2];
		next[2] = TYPES[this.rand(0, 7)];

		let active;

		switch (activeType) {
			case 'O':
				active = [ { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 3 } ];
				break;
			case 'I':
				active = [ { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 } ];
				break;
			case 'T':
				active = [ { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 2 } ];
				break;
			case 'Z':
				active = [ { x: 5, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 3 } ];
				break;
			case 'S':
				active = [ { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 3 } ];
				break;
			case 'L':
				active = [ { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 5, y: 3 } ];
				break;
			case 'J':
				active = [ { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 4, y: 3 } ];
				break;

			case 'D':
				active = [ { x: 5, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 3 } ];
				break;

			default:
				console.log('sth gone wrong');
		}

		board[active[0].y][active[0].x].type = activeType;
		board[active[1].y][active[1].x].type = activeType;
		board[active[2].y][active[2].x].type = activeType;
		board[active[3].y][active[3].x].type = activeType;

		this.setState({
			board: board,
			active: active,
			activeType: activeType,
			next: next
		});
	};

	//function moves active block down
	moveDown = () => {
		let { should_move, board, active, activeType } = this.state;

		should_move += 1;
		if (should_move >= 4) should_move = 0;

		if (should_move === 0) {
			board[active[0].y][active[0].x].type = 'E';
			board[active[1].y][active[1].x].type = 'E';
			board[active[2].y][active[2].x].type = 'E';
			board[active[3].y][active[3].x].type = 'E';

			active[0].y += 1;
			active[1].y += 1;
			active[2].y += 1;
			active[3].y += 1;

			board[active[0].y][active[0].x].type = activeType;
			board[active[1].y][active[1].x].type = activeType;
			board[active[2].y][active[2].x].type = activeType;
			board[active[3].y][active[3].x].type = activeType;
		}

		this.setState({
			board: board,
			active: active,
			should_move: should_move,
			last_key: null
		});
	};

	//function sets active block at it current position
	stayBlock = () => {
		let { board, active } = this.state;

		board[active[0].y][active[0].x].stay = true;
		board[active[1].y][active[1].x].stay = true;
		board[active[2].y][active[2].x].stay = true;
		board[active[3].y][active[3].x].stay = true;

		Sound({name: 'stay'});

		this.setState({
			board: board
		});
	};

	//function checks the pressed keys and uses them to perform actions on the active block
	handleKey = () => {
		let { pause, board, active, activeType, btns, keysPressed, last_key, score } = this.state;

		if (!pause) {
			// move to the left
			if (keysPressed[btns.left] && !this.if_touch_left()) {
				for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = 'E';

				for (let i = 0; i < 4; i++) active[i].x -= 1;

				for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = activeType;

				this.key_pressed();

				Sound({name: 'move', dead: this.state.gameOver});
			}

			// move to the right
			if (keysPressed[btns.right] && !this.if_touch_right()) {
				for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = 'E';

				for (let i = 0; i < 4; i++) active[i].x += 1;

				for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = activeType;

				this.key_pressed();

				Sound({name: 'move', dead: this.state.gameOver});
			}

			// move down
			if (keysPressed[btns.down] && !this.if_touch()) {
				for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = 'E';

				for (let i = 0; i < 4; i++) active[i].y += 1;

				for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = activeType;

				last_key = btns.down;

				score++;

				Sound({name: 'move', dead: this.state.gameOver});
			}

			// skip
			if (keysPressed[btns.skip]) {
				while (!this.if_touch()) {
					for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = 'E';

					for (let i = 0; i < 4; i++) active[i].y += 1;

					for (let i = 0; i < 4; i++) board[active[i].y][active[i].x].type = activeType;

					score++;
				}

				last_key = btns.skip;
			}

			// rotate
			if (keysPressed[btns.rotate]) {
				this.rotate();
				this.key_pressed();
			}
		}

		if (keysPressed[btns.pause]) pause = !pause;

		this.setState({
			board: board,
			active: active,
			pause: pause,
			last_key: last_key,
			score: score
		});
	};

	//when block can't move down, you have a while to move it
	key_pressed = () => {
		this.setState({
			landing_time: 5
		});
	};

	//function checks if active block could be set
	if_should_go = () => {
		let { landing_time, last_key, btns, if_can_handle } = this.state;

		let check = false;

		if (last_key === btns.skip || last_key === btns.down) {
			if_can_handle = 3;
			landing_time = 5;
			last_key = null;

			check = true;
		} else {
			if (landing_time === 0) {
				landing_time = 5;

				check = true;
			} else {
				landing_time -= 1;
			}
		}

		this.setState({
			landing_time: landing_time,
			if_can_handle: if_can_handle,
			last_key: last_key
		});

		return check;
	};

	//function checks if any line has been fullified
	//yes - increases players score, increase combo value, move rest of lines down
	//no - reset combo value
	check_strike = () => {
		let { board, WIDTH, HEIGHT, score, combo } = this.state;
		let if_combo = false;

		return new Promise((res, rej) => {
			for (let m = HEIGHT - 1; m > 3; m--) {
				for (let i = HEIGHT - 1; i > 3; i--) {
					let check = true;

					for (let j = 0; j < WIDTH; j++) {
						if (board[i][j].stay !== true) check = false;
					}

					if (check === true) {
						if_combo = true;
						score += +(100 * combo);
						score = +score.toFixed();
						Sound({name: 'success', dead: this.state.gameOver});

						for (let k = i; k > 0; k--) {
							for (let l = 0; l < WIDTH; l++) {
								board[k][l].type = board[k - 1][l].type;
								board[k][l].stay = board[k - 1][l].stay;
							}
						}
					}
				}
			}

			if (if_combo === true) {
				combo = (combo *= 1.2).toFixed(2);
			} else {
				combo = 1;
			}

			this.setState({
				board: board,
				score: score,
				combo: combo
			}, res(true));
		});
	};

	//function rotates active block
	//checks if active block can be rotated
	//yes - rotate active block
	//no - doing nothing
	rotate = () => {
		const { activeType, WIDTH, HEIGHT } = this.state;
		let { board, active } = this.state;


		// direction we need to move active block so we can rotate it
		// none - we dont have to move it
		// left - we have to move it to the left
		// right - we have to move it to the right
		// cant - we cant move it
		let dirToRes = 'none';

		let activeTemp = JSON.parse(JSON.stringify(active)); // copy of active block

		//rotate activeTemp
		for (let i = 0; i < 4; i++) {
			let r = [ activeTemp[i].y, activeTemp[i].x ];
			let p = [ activeTemp[1].y, activeTemp[1].x ];
			let Vr = [ r[0] - p[0], r[1] - p[1] ];

			let R = [ [ 0, -1 ], [ 1, 0 ] ];

			let Vt = [ R[0][0] * Vr[0] + R[0][1] * Vr[1], R[1][0] * Vr[0] + R[1][1] * Vr[1] ];

			activeTemp[i].y = p[0] + Vt[0];
			activeTemp[i].x = p[1] + Vt[1];
		}

		//check conditions
		//everything ok - replace active block with its copy
		//something wrong - try to move active copy and then rotate


		for (let i = 0; i < 4; i++) {
			if (
				activeTemp[i].x < 0 ||
				activeTemp[i].x > WIDTH - 1 ||
				activeTemp[i].y < 0 ||
				activeTemp[i].y > HEIGHT - 1 ||
				board[activeTemp[i].y][activeTemp[i].x] === undefined ||
				board[activeTemp[i].y][activeTemp[i].x].stay === true ||
				activeType === 'D' ||
				activeType === 'O'
			) {
				dirToRes = 'cant';
			}
		}


		if (dirToRes === 'cant') {
			dirToRes = 'left';

			activeTemp = JSON.parse(JSON.stringify(active)); // copy of active block

			activeTemp[0].x--;
			activeTemp[1].x--;
			activeTemp[2].x--;
			activeTemp[3].x--;

			for (let i = 0; i < 4; i++) {
				let r = [ activeTemp[i].y, activeTemp[i].x ];
				let p = [ activeTemp[1].y, activeTemp[1].x ];
				let Vr = [ r[0] - p[0], r[1] - p[1] ];

				let R = [ [ 0, -1 ], [ 1, 0 ] ];

				let Vt = [ R[0][0] * Vr[0] + R[0][1] * Vr[1], R[1][0] * Vr[0] + R[1][1] * Vr[1] ];

				activeTemp[i].y = p[0] + Vt[0];
				activeTemp[i].x = p[1] + Vt[1];
			}

			for (let i = 0; i < 4; i++) {
				if (
					activeTemp[i].x < 0 ||
					activeTemp[i].x > WIDTH - 1 ||
					activeTemp[i].y < 0 ||
					activeTemp[i].y > HEIGHT - 1 ||
					board[activeTemp[i].y][activeTemp[i].x] === undefined ||
					board[activeTemp[i].y][activeTemp[i].x].stay === true ||
					activeType === 'D' ||
					activeType === 'O'
				) {
					dirToRes = 'cant';
				}
			}
		}

		if (dirToRes === 'cant') {
			dirToRes = 'right';

			activeTemp = JSON.parse(JSON.stringify(active)); // copy of active block

			activeTemp[0].x++;
			activeTemp[1].x++;
			activeTemp[2].x++;
			activeTemp[3].x++;

			for (let i = 0; i < 4; i++) {
				let r = [ activeTemp[i].y, activeTemp[i].x ];
				let p = [ activeTemp[1].y, activeTemp[1].x ];
				let Vr = [ r[0] - p[0], r[1] - p[1] ];

				let R = [ [ 0, -1 ], [ 1, 0 ] ];

				let Vt = [ R[0][0] * Vr[0] + R[0][1] * Vr[1], R[1][0] * Vr[0] + R[1][1] * Vr[1] ];

				activeTemp[i].y = p[0] + Vt[0];
				activeTemp[i].x = p[1] + Vt[1];
			}

			for (let i = 0; i < 4; i++) {
				if (
					activeTemp[i].x < 0 ||
					activeTemp[i].x > WIDTH - 1 ||
					activeTemp[i].y < 0 ||
					activeTemp[i].y > HEIGHT - 1 ||
					board[activeTemp[i].y][activeTemp[i].x] === undefined ||
					board[activeTemp[i].y][activeTemp[i].x].stay === true ||
					activeType === 'D' ||
					activeType === 'O'
				) {
					dirToRes = 'cant';
				}
			}
		}


		if (dirToRes !== 'cant') {
			board[active[0].y][active[0].x].type = 'E';
			board[active[1].y][active[1].x].type = 'E';
			board[active[2].y][active[2].x].type = 'E';
			board[active[3].y][active[3].x].type = 'E';

			if(dirToRes === 'left'){
				active[0].x--;
				active[1].x--;
				active[2].x--;
				active[3].x--;
			}else if(dirToRes === 'right'){
				active[0].x++;
				active[1].x++;
				active[2].x++;
				active[3].x++;
			}

			for (let i = 0; i < 4; i++) {
				let r = [ active[i].y, active[i].x ];
				let p = [ active[1].y, active[1].x ];
				let Vr = [ r[0] - p[0], r[1] - p[1] ];

				let R = [ [ 0, -1 ], [ 1, 0 ] ];

				let Vt = [ R[0][0] * Vr[0] + R[0][1] * Vr[1], R[1][0] * Vr[0] + R[1][1] * Vr[1] ];

				active[i].y = p[0] + Vt[0];
				active[i].x = p[1] + Vt[1];
			}

			board[active[0].y][active[0].x].type = activeType;
			board[active[1].y][active[1].x].type = activeType;
			board[active[2].y][active[2].x].type = activeType;
			board[active[3].y][active[3].x].type = activeType;

			Sound({name: 'move', dead: this.state.gameOver});
		}

		this.setState({
			active: active,
			board: board
		});
	};

	//main game function
	frame = () => {
		let { pause, gameOver } = this.state;

		if (this.if_touch()) {
			if (this.if_lose()) {

				this.setState(
					{
						gameOver: true
					},
					() => {
						if (!gameOver) {
							Sound({name: 'lose'});
							this.props.lose(this.state.score);
						}
					}
				);
			}

			if (this.if_should_go()) {
				this.stayBlock();
				this.check_strike().then(() => {
					this.generateNextActive();
				});
			}
		}

		if (!this.if_touch() && !pause) this.moveDown();

		this.setState({}, () => {
			setTimeout(() => {
				if (!gameOver) this.frame();
			}, 150);
		});
	};

	componentDidMount() {
		this.start();
	}

	componentWillUnmount() {
		clearInterval(this.interval1);
		clearInterval(this.interval2);
	}

	render() {
		const { gameOver, pause, score, combo, next, board, WIDTH, HEIGHT } = this.state;

		return (
			<div className={'Board'}>
				<Cells gameOver={gameOver} board={board} WIDTH={WIDTH} HEIGHT={HEIGHT} />
				<GameOver gameOver={gameOver} />
				<Pause gameOver={gameOver} pause={pause} />
				<Next gameOver={gameOver} next={next} />
				<Score score={score} combo={combo}/>
			</div>
		);
	}
}
 