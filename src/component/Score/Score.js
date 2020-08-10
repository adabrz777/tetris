import React from 'react';
import './index.css';
import Combo from '../../component/Combo/Combo';

export default function Score(props){
    return (
        <div className={'Score'}>
            {props.score}
            <Combo combo={props.combo} />
        </div>
    )
}
