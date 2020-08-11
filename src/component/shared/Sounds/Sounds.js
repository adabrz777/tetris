import React, { Component } from 'react';
import './index.css';
import './fontello/css/fontello.css';

class Audio extends Component {
	constructor(props) {
		super(props);
		this.state = {
            volumeValue: localStorage.getItem('tetris-rjs-music-volume')/1 || 50,
            soundEffects: true
        };  
	}

	toggleMusic = () => {
        Music({action: 'toggle'});
	};

    handleVolumeChange = (e) => {

        let volumeValue = e.target.value;
        let audio = document.querySelector('.Audio__music');
        audio.volume = volumeValue/100;

        this.setState({
            volumeValue: volumeValue
        }, localStorage.setItem('tetris-rjs-music-volume', volumeValue))

    }

    toggleSoundEffects = () => {
        let soundEffects = false;

        if(localStorage.getItem('tetris-rjs-sound-effects') === 'true')
            soundEffects = true;
        else
            soundEffects = false;

        document.querySelector('.Audio__btn-toggle-sound-effects').classList.toggle('Audio__btn-toggle-sound-effects--disabled');


        localStorage.setItem('tetris-rjs-sound-effects', !soundEffects);
        this.setState({
            soundEffects: !soundEffects
        })

    }

	componentDidMount() {
        if(!localStorage.getItem('tetris-rjs-music'))
            localStorage.setItem('tetris-rjs-music', true);

        let audio = document.querySelector('.Audio__music');
        if(audio !== null){
            if(localStorage.getItem('tetris-rjs-music-volume'))
                audio.volume = localStorage.getItem('tetris-rjs-music-volume')/100;
            else
                audio.volume = 0.5;
        }

        if(localStorage.getItem('tetris-rjs-music') === 'false')
            document.querySelector('.Audio__btn-toggle-music').classList.add('Audio__btn-toggle-music--disabled');

        if(localStorage.getItem('tetris-rjs-sound-effects') === 'false')
            document.querySelector('.Audio__btn-toggle-sound-effects').classList.add('Audio__btn-toggle-sound-effects--disabled');
    }

	render() {
		return (
			<div className={'Audio'}>
				<div onClick={this.toggleMusic} className={'Audio__btn-toggle-music'}>{this.state.audio}<i className="icon-note-beamed" /></div>
                <input type='range' className={'Audio__volume'} min={1} max={100} value={this.state.volumeValue} onChange={this.handleVolumeChange}/>
                
                <div onClick={this.toggleSoundEffects} className={'Audio__btn-toggle-sound-effects'}><i className="icon-note" /></div>
                
                <audio src={`${require('.\\musics-src\\music.mp3')}`} className={'Audio__music'} loop/>
			</div>
		);
    }
}

export default Audio;

export function Music (action = {action: 'play'}) {
    let audio = document.querySelector('.Audio__music');

    switch(action.action){
        case 'play': {
            if(localStorage.getItem('tetris-rjs-music') === 'true'){
                audio.play();

                if(audio.classList.contains('Audio__btn-toggle-music--disabled'))
                    audio.classList.remove('Audio__btn-toggle-music--disabled');
            }

            break;
        }

        case 'pause': {
            audio.pause();

            if(!audio.classList.contains('Audio__btn-toggle-music--disabled'))
                audio.classList.add('Audio__btn-toggle-music--disabled');

            break;
        }

        case 'toggle': {
            let audio = document.querySelector('.Audio__music');

            audio.paused ? audio.play() : audio.pause();
    
            let toggle = document.querySelector('.Audio__btn-toggle-music');
    
            toggle.classList.toggle('Audio__btn-toggle-music--disabled');

            if(localStorage.getItem('tetris-rjs-music') === 'false')
                localStorage.setItem('tetris-rjs-music', true)
            else
                if(localStorage.getItem('tetris-rjs-music') === 'true')
                    localStorage.setItem('tetris-rjs-music', false)


            break;
        }
        
        default: console.log('Wrong action type');
    }
    
}


/**
 * @description Simple function to play sounds
 * @property 
 * @property {string} sound.name - Sound you want to play
 * @property {boolean} [sound.dead = false] - Is your component dead? Dead component shouldn't play sounds
 * @property {number} [sound.volume = 1] - volumme of your sound (1 = 100%, 0 = 0%)
 */
export function Sound(sound = {name: '', dead: false, volume: 1}){
    let {name, dead = false, volume = 1 } = {...sound};

    if(dead) return console.error('Component is dead');
    if(localStorage.getItem('tetris-rjs-sound-effects') === 'false') return console.error('Sound Effects are off');

    switch(name){
        case 'stay':    name = `${require('.\\sounds-src\\stay.wav')}`;       break;
        case 'lose':    name = `${require('.\\sounds-src\\lose.wav')}`;       break;
        case 'move':    name = `${require('.\\sounds-src\\move.wav')}`;       break;
        case 'start':   name = `${require('.\\sounds-src\\start.ogg')}`;      break;
        case 'success': name = `${require('.\\sounds-src\\success.wav')}`;    break;
        
        default: return console.error('Chosen sound does not exist');
    }

    let audio = document.createElement('audio');

    audio.src = name;

    try{
        if(volume < 0 || volume > 1) throw new Error('Dźwięk musi być z przedziału [0, 1]');
        audio.volume = volume;
    }catch(error){
        console.error(error);
    }
    
    audio.play();


}