import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AudioVolume from './audioVolume';
import AudioControls from './audioControls';
import AudioProgress from './audioProgress';
import AudioDisplay from './audioDisplay';
import { useNowPlaying } from '../../Context/nowPlaying';
import './mezzoPlayer.scss';
import { TbX } from 'react-icons/tb';

function MezzoPlayer() {
    const {
        playerState, setPlayerState,
        fullScreen, setFullScreen,
        trackIndex, setTrackIndex,
        currentTrack, setCurrentTrack,
        progress, setProgress,
        duration, setDuration,
        loop, setLoop,
        audioRef,
        progressRef,
        tracks
    } = useNowPlaying();

    useEffect(() => {
        setCurrentTrack(tracks[trackIndex])
    }, [tracks])

    return (
        <div id="mezzo_player---wrapper" className={`${fullScreen ? 'mezzo_player--full' : 'mezzo_player--mini'}`}>
            {fullScreen ? <span className='now_playing_modal--close' onClick={() => setFullScreen(false)}><TbX/></span> : null}
            <AudioControls { ...{ loop, setLoop, tracks, trackIndex, setTrackIndex, setCurrentTrack, audioRef, setPlayerState, playerState, progressRef, duration, setProgress }}/>
            <div className='mezzo_player--player'>
            <AudioDisplay { ...{ fullScreen, setFullScreen, currentTrack }}/>
            <AudioProgress { ...{ fullScreen, progressRef, audioRef, progress, duration }} />
            </div>
            <AudioVolume { ...{ fullScreen, audioRef }} />
        </div>
    )
}

export default MezzoPlayer
