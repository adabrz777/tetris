import React, { Component } from 'react';
import './style.css';
import Board from './Board';
import Settings from './Settings';
import {Sound} from './Sounds';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//key codes for players
			btns1: [ 87, 83, 65, 68, 86, 66, 80 ],
			btns2: [ 38, 40, 37, 39, 190, 191, 80 ],
			restartButton: 82,

			//active keys tab
			keysPressed: [],

			//boards tab -- one board - one player
			boards: [],

			//number of active players
			players: 0,

			//is game started yet?
			start: false,

			//is application running on desktop?
			desktop: true,

			//loser's score
			score: 0
		};
	}

	//board (child component) will call this function on player lose
	lose = (score) => {
		this.setState({
			score: score
		})
	}

	handleKeyDown = (event) => {
		let key = event.nativeEvent.keyCode;
        
        let keysPressed = this.state.keysPressed;

        keysPressed[key] = true;

        this.setState({
            keysPressed: keysPressed
        }, ()=>{
			if(this.state.keysPressed[this.state.restartButton])
				this.restart();		
			})
	};

	handleKeyUp = (event) => {
		let keysPressed = this.state.keysPressed;
		
        let key = event.nativeEvent.keyCode;


        delete keysPressed[key];
        

        this.setState({
            keysPressed: keysPressed
        })
        
	};

	restart = () => {
		if(this.state.players === 2){
			let board = [];

			board[0] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns1} keyS={1} key={1} lose={this.lose}/>;
			board[1] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns2} keyS={2} key={2} lose={this.lose}/>;
	
			this.setState({
				board: [],
				players: 2
			}, ()=>{
				setTimeout(()=>{
					this.setState({
						board: board
					})
				}, 10)
			})
		}
		else if(this.state.players === 1){
			let board = [];

			board[0] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns1} keyS={1} key={1} lose={this.lose}/>;
	
			this.setState({
				board: [],
				players: 1
			}, ()=>{
				setTimeout(()=>{
					this.setState({
						board: board
					})
				}, 10)
			})
		}

		Sound('start', 'start');
	}

	onePlayer = () => {
		if(this.state.players !== 1){
			let board = [];

			board[0] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns1} keyS={1} key={1} lose={this.lose}/>;
	
			if(!this.state.start){
				let audio = document.querySelector('#audio');
				audio.play();
			}
			Sound('start', 'start', this.state.gameOver);

			this.setState({
				board: [],
				players: 1,
				start: true
			}, ()=>{
				setTimeout(()=>{
					this.setState({
						board: board
					})
				}, 10)
			})
		}
	}

	twoPlayers = () => {

		if(this.state.players !== 2){
			let board = [];

			board[0] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns1} keyS={1} key={1} lose={this.lose}/>;
			board[1] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns2} keyS={2} key={2} lose={this.lose}/>;
	
			if(!this.state.start){
				let audio = document.querySelector('#audio');
				audio.play();
			}

			Sound('start', 'start');
			
			this.setState({
				board: [],
				players: 2,
				start: true
			}, ()=>{
				setTimeout(()=>{
					this.setState({
						board: board
					})
				}, 10)
			})
		}


	}

	componentDidMount(){
		let desktop = true;

		let userAgent = navigator.userAgent.toLowerCase();

		if (typeof orientation !== 'undefined' || userAgent.indexOf('mobile') >= 0)
			desktop = false;



		this.setState({
			desktop: desktop
		})
	}

	// left - 37
	// right - 39
	// up - 38
	// down - 40
	// z - 90
	// x - 88
	// p - 80

	// w - 87
	// a - 65
	// s - 83
	// d - 68
	// v - 86
	// b - 66
	// . - 190
	// / - 191

	render() {
		if(this.state.desktop){
			return (
				<div className={'Game'} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex={0}>
					{this.state.board}
					<Settings restart={this.restart} start={this.state.start} onePlayer={this.onePlayer} twoPlayers={this.twoPlayers} score={this.state.score}/>
					
				</div>
			);
		}
		else{
			return <p className={'Sorry'}>Sorry but this is only desktop app<br/>:'&#40;</p>
		}
		
	}
}

export default App;
