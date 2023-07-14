import React from 'react';
import './loading.css';

function Loading({message}) {
  return (
    <div className='loading--wrapper'>
      <div className="loading--contents">
        <div className='loading--graphic'>
          <div className='loading--animation bar--1'></div>
          <div className='loading--animation bar--2'></div>
          <div className='loading--animation bar--3'></div>
        </div>
        <p className="loading--message">{message}</p>
      </div>
    </div>
  )
}

export default Loading
