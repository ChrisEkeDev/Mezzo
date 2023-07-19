import React from 'react'
import { TbArrowsMaximize } from 'react-icons/tb'
import placeholder from '../../assets/mezzo-placeholder.svg'

function AudioDisplay({ fullScreen, currentTrack, setFullScreen }) {

  return (
    <div className='now_playing_display--wrapper'>

      <div className='now_playing_player--information'>
        <div className='now_playing_player--image' style={{backgroundImage: `url(${currentTrack?.Artist?.image})`}}>
          { currentTrack?.Artist?.image ? null : <img src={placeholder}/> }
        </div>
        {
          fullScreen ?
          <div className='now_playing_player--text'>
              <h1>{currentTrack?.name}</h1>
              <h2>{currentTrack?.Artist?.name}</h2>
          </div> :
          <div className='now_playing_player--name'>
              {
                currentTrack ?
                <>
                <span className='now_playing_player--song'>{currentTrack?.name}</span>
                  <span>-</span>
                <span  className='now_playing_player--artist'>{currentTrack?.Artist?.name}</span>
                </> :
                <span>Pick a song</span>
              }
          </div>
        }
      </div>

      {
        fullScreen ?
        null :
        <span onClick={() => setFullScreen(true)} className='now_playing_player--expand'>
            <TbArrowsMaximize/>
        </span>
      }

    </div>
  )
}

export default AudioDisplay
