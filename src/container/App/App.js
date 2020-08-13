import React, { Component } from 'react';
import './index.css';
import Board from '../Board/Board';
import Gui from '../Gui/Gui';
import Sorry from '../../component/Sorry/Sorry';
import {Sound, Music} from '../../component/shared/Sounds/Sounds';

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

		Sound({name: 'start'});
	}

	onePlayer = () => {
		if(this.state.players !== 1){
			let board = [];

			board[0] = <Board keysPressed={this.state.keysPressed} btns={this.state.btns1} keyS={1} key={1} lose={this.lose}/>;
	
			if(!this.state.start){
				Music({action: 'play'});
			}
			Sound({name: 'start'});

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
				Music({action: 'play'});
			}

			Sound({name: 'start'});
			
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

	render() {
		if(this.state.desktop){
			return (
				<div className={'App'} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex={0}>
					{this.state.board}
					<Gui restart={this.restart} start={this.state.start} onePlayer={this.onePlayer} twoPlayers={this.twoPlayers} score={this.state.score}/>
					<div className="App__code">You can check code <a href="https://github.com/adabrz777/tetris">here</a>.</div>
				</div>
			);
		}
		else{
			return <Sorry />
		}
		
	}
}

export default App;
