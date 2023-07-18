import React from 'react'

function AudioProgress({fullScreen, progressRef, audioRef, progress, duration }) {

  const handleProgress = () => {
    audioRef.current.currentTime = progressRef.current.value
  }

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <div className='now_playing_progress--wrapper'>
      <div className='now_playing_progress--contents'>
        <span className='mezzo_player--current_time'>{formatTime(progress)}</span>
          <input className="mezzo_player--progress_bar" type='range' ref={progressRef} onChange={handleProgress}/>
          <div className="mezzo_player--progress_bar_highlight" style={{width: `${Math.floor((progress/duration) * 100) + 1}%`}}></div>
        <span className='mezzo_player--time'>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default AudioProgress
