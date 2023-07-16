import React from 'react';
import './nowPlaying.css'
import { useSelector } from 'react-redux';
import { useNowPlaying } from '../../context/nowPlaying';
import { TbPlayerPlayFilled, TbPlayerTrackNextFilled,TbPlayerPauseFilled,TbArrowsShuffle,TbRepeat, TbPlayerTrackPrevFilled,  TbX } from 'react-icons/tb';

function NowPlayingModal({state, setFull}) {
    const nowPlaying = useSelector(state => state.songs.nowPlaying)
    const { setPlayerState, playerState } = useNowPlaying();
    console.log(nowPlaying)
    return (
        <div className='now_playing_modal--wrapper'>
            <span onClick={() => setFull(false)} className='now_playing_model--close'>
                <TbX/>
            </span>
            <div className='now_playing_modal--contents'>
                <div className='now_playing_modal--information'>
                    <div className={`now_playing_modal--image`} style={{backgroundImage: `url(${nowPlaying?.Artist?.image})`}}></div>
                    <div className='now_playing_modal--text'>
                        <h1>{nowPlaying?.name}</h1>
                        <h2>{nowPlaying?.Artist?.name}</h2>
                        <p>{nowPlaying?.description} {nowPlaying?.Artist?.bio}</p>
                    </div>
                </div>
                <div className='now_playing_modal--player'>
                    <div className='now_playing_modal--slider'>
                        <div  className='now_playing_modal--bar'></div>
                        <div className='now_playing_model--node'></div>
                        <span>0:00</span>
                        <span>4:44</span>
                    </div>
                    <div className='now_playing_modal--controls'>
                        <span className='now_playing_modal_control'>
                            <TbArrowsShuffle/>
                        </span>
                        <span className='now_playing_modal_control modal_skip'>
                            <TbPlayerTrackPrevFilled/>
                        </span>
                        <span onClick={playerState === 'pause' || playerState === 'stop' ? () => setPlayerState('play') : () => setPlayerState('pause')} className='now_playing_modal_control modal_play'>
                            {
                                playerState === 'pause' || playerState === "stop" ?
                                <TbPlayerPlayFilled/> :
                                <TbPlayerPauseFilled/>
                            }
                        </span>
                        <span className='now_playing_modal_control modal_skip'>
                            <TbPlayerTrackNextFilled/>
                        </span>
                        <span className='now_playing_modal_control'>
                            <TbRepeat/>
                         </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NowPlayingModal
