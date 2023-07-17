import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AudioVolume from './audioVolume';
import AudioControls from './audioControls';
import AudioProgress from './audioProgress';
import AudioDisplay from './audioDisplay';
import './mezzoPlayer.css';
import { TbX } from 'react-icons/tb';

function MezzoPlayer() {
    const nowPlaying = useSelector(state => state.songs.nowPlaying)
    const tracks = Object.values(nowPlaying)
    const [fullScreen, setFullScreen] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const [ currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    const [ playerState, setPlayerState ] = useState('paused');
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [ loop, setLoop] = useState(false)
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const progressRef = useRef(null);


    useEffect(() => {
        setCurrentTrack(tracks[trackIndex])
    }, [dispatch, tracks])

    if (!nowPlaying) return <div></div>

    return (
        <div id="mezzo_player---wrapper" className={`${fullScreen ? 'mezzo_player--full' : 'mezzo_player--mini'}`}>
            {fullScreen ? <span className='now_playing_model--close' onClick={() => setFullScreen(false)}><TbX/></span> : null}
            <AudioControls { ...{ loop, setLoop, fullScreen, tracks, trackIndex, setTrackIndex, setCurrentTrack, audioRef, setPlayerState, playerState, progressRef, duration, setProgress }}/>
            <div className='mezzo_player--player'>
            <AudioDisplay { ...{ loop, fullScreen, setFullScreen, tracks, trackIndex, setTrackIndex, setCurrentTrack, currentTrack, nowPlaying, audioRef, setDuration, progressRef }}/>
            <AudioProgress { ...{ fullScreen, progressRef, audioRef, progress, duration }} />
            </div>
            <AudioVolume { ...{ fullScreen, audioRef }} />
        </div>
    )
}

export default MezzoPlayer
