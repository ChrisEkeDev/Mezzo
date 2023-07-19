import React, { useEffect, useCallback, useRef } from 'react';
import { TbPlayerPauseFilled, TbPlayerPlayFilled, TbPlayerSkipBackFilled ,TbArrowsShuffle,TbRepeat, TbPlayerSkipForwardFilled } from 'react-icons/tb';

function AudioControls({ loop, setLoop, tracks, trackIndex, setTrackIndex, setCurrentTrack, playerState, setPlayerState, audioRef, progressRef, duration, setProgress}) {
    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current?.currentTime;
        setProgress(currentTime);
        if (progressRef.current) {
            progressRef.current.value = currentTime;
            progressRef.current.style.setProperty(
                '--range-progress',
                `${(progressRef.current.value / duration) * 100}%`
                );
        }

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressRef, setProgress]);


    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
          } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
          }
    };

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
          } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
          }
    };


    useEffect(() => {
        if (playerState === 'playing') {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [playerState, audioRef])

    return (
        <div className='now_playing_controls--wrapper'>
            <span className='now_playing_control'>

            </span>
            <span className='now_playing_control skip' onClick={handlePrevious}>
                <TbPlayerSkipBackFilled/>
            </span>
            <span className='now_playing_control play'>
            {
                playerState === 'paused' ?
                <span onClick={() => setPlayerState('playing')} className='now_playing_control play'>
                    <TbPlayerPlayFilled/>
                </span>
                :
                <span onClick={() => setPlayerState('paused')} className='now_playing_control play'>
                    <TbPlayerPauseFilled/>
                </span>
            }
            </span>
            <span className='now_playing_control skip' onClick={handleNext}>
                <TbPlayerSkipForwardFilled/>
            </span>
            <span onClick={() => setLoop(!loop)} className='now_playing_control'>
                <TbRepeat className={`${loop ? 'loop--active' : ''}`}/>
            </span>
        </div>
    )
}

export default AudioControls
