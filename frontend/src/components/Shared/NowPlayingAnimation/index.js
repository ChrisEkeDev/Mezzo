import React from 'react';
import './styles.scss';

function NowPlayingAnimation({styles}) {
  return (
    <div className={`now_playing--graphic ${styles}`}>
        <div className='now_playing--animation bar--1'></div>
        <div className='now_playing--animation bar--2'></div>
        <div className='now_playing--animation bar--3'></div>
    </div>
  )
}

export default NowPlayingAnimation
