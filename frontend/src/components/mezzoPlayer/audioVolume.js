import React, { useState, useEffect } from 'react'
import { TbVolumeOff, TbVolume3, TbVolume2, TbVolume } from 'react-icons/tb';

function AudioVolume({fullScreen, audioRef}) {
  const [ volume, setVolume] = useState(60);
  const [mute, setMute] = useState(false);


  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = mute;
    }
  }, [volume, audioRef, mute])

  return (
    <div className="now_playing_volume--wrapper">
      <div className="now_playing_volume--contents">
        <button className="now_playing_volume--button" onClick={() => setMute(!mute)}>
          {mute || volume < 5 ?
          <TbVolumeOff />
         : volume < 40 ?
          <TbVolume2 />
          :
          <TbVolume />
        }
        </button>
        <input className="now_playing_volume--volume_bar"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
  </div>
  )
}

export default AudioVolume
