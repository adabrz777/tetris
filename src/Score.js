import React from 'react';

export default function Score(props){
    return (
        <div className={'Score'}>
            {props.score}
            {props.comboDraw}
        </div>
    )
}