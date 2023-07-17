import React from 'react'
import { TbArrowsMaximize } from 'react-icons/tb'
import placeholder from '../../assets/mezzo-placeholder.svg'

function AudioDisplay({ loop, fullScreen, currentTrack, setFullScreen, tracks, trackIndex, setTrackIndex, setCurrentTrack, nowPlaying, audioRef, setDuration, progressRef }) {

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
        setTrackIndex(0);
        setCurrentTrack(tracks[0]);
      } else {
        setTrackIndex((prev) => prev + 1);
        setCurrentTrack(tracks[trackIndex + 1]);
      }
};

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressRef.current.max = seconds;
  }

  return (
    <div className='now_playing_display--wrapper'>
      <audio ref={audioRef} src={currentTrack?.song} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} loop={loop}></audio>
      <div className='now_playing_player--information'>
        <div className='now_playing_player--image' style={{backgroundImage: `url(${currentTrack?.Artist.image})`}}>
          { currentTrack?.Artist.image ? null : <img src={placeholder}/> }
        </div>
        {
          fullScreen ?
          <div className='now_playing_player--text'>
              <h1>{currentTrack?.name}</h1>
              <h2>{currentTrack?.Artist?.name}</h2>
              <p>{currentTrack?.description} {currentTrack?.Artist?.bio}</p>
          </div> :
          <div className='now_playing_player--song'>
            <span className='now_playing_player--name'>
              {
                nowPlaying ?
                <>
                <span className='now_playing_player--song'>{currentTrack?.name}</span>
                  <span>-</span>
                <span  className='now_playing_player--artist'>{currentTrack?.Artist?.name}</span>
                </> :
                <span>Pick a song</span>
              }
            </span>
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
