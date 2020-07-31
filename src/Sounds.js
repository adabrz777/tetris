import React, { Component } from 'react';
import './fontello/css/fontello.css'

class Audio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			play: true,
            audio: <audio src={`${require('./music.mp3')}`} id={'audio'} loop/>,
            volumeValue: 50
		};
	}

	toggleMusic = () => {
		let play = !this.state.play;
		let audio = document.querySelector('#audio');

		play ? audio.play() : audio.pause();


		let toggle = document.getElementsByClassName('__toggle');

		toggle[0].classList.toggle('--disabled');
		
		
		this.setState({
			play: play
		});
	};

    handleVolumeChange = (e) => {

        let volumeValue = e.target.value;
        let audio = document.querySelector('#audio');
        audio.volume = volumeValue/100;

        this.setState({
            volumeValue: volumeValue
        })

    }

    toggleSoundEffects = () => {
        let soundEffect = document.getElementsByClassName('__sound');
		
		for(let i = 0; i < soundEffect.length; i++){
			if(soundEffect[i]) soundEffect[i].volume = Math.abs(soundEffect[i].volume - 1);
		}

        soundEffect = document.getElementsByClassName('__soundEffect');
		soundEffect[0].classList.toggle('--disabled');

    }

	componentDidMount() {
        let audio = document.querySelector('#audio');
        
        if(audio !== null) audio.volume = 0.5;
	}

	render() {
		return (
			<div className={'Audio'}>
				<div onClick={this.toggleMusic} className={'__toggle'}>{this.state.audio}<i className="icon-note-beamed" /></div>
                <input type='range' className={'__volume'} min={1} max={100} value={this.state.volumeValue} onChange={this.handleVolumeChange}/>
                <div onClick={this.toggleSoundEffects} className={'__soundEffect'}><i className="icon-note" /></div>

                <audio className={'__sound'} id={'stay1'} />
                <audio className={'__sound'} id={'stay2'} />

				<audio className={'__sound'} id={'move1'} />
                <audio className={'__sound'} id={'move2'} />

				<audio className={'__sound'} id={'lose1'} />
                <audio className={'__sound'} id={'lose2'} />

                <audio className={'__sound'} id={'success1'} />
                <audio className={'__sound'} id={'success2'} />

                <audio className={'__sound'} id={'startstart'} />
			</div>
		);
	}
}

export default Audio;



export function Sound(src, key, dead = false){

    let sound = document.getElementById(src+key);
    
    switch(src){
        case 'stay':    src = `${require('./stay.wav')}`;       break;
        case 'lose':    src = `${require('./lose.wav')}`;       break;
        case 'move':    src = `${require('./move.wav')}`;       break;
        case 'start':   src = `${require('./start.ogg')}`;      break;
        case 'success': src = `${require('./success.wav')}`;    break;
        
        default: console.log('sth gone wrong');
    }
    

    if(!dead){
        new Promise((res)=>{
            try {
                sound.pause();  
                res();
            } catch (error) {
                console.log(error);
            }
            
            
        }).then(()=>{
            sound.src = src;
        }).then(()=>{
            sound.currentTime = 0;
        }).then(()=>{
            try {
                sound.play();    
            } catch (error) {
                console.log(error);
            }
            
        })
    }
}
