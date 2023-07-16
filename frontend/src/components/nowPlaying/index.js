import React from 'react'
import { useSelector } from 'react-redux';
import { useNowPlaying } from '../../context/nowPlaying'
import { TbArrowsMaximize,TbPlayerPauseFilled, TbPlayerPlayFilled, TbPlayerTrackNextFilled,TbArrowsShuffle,TbRepeat, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import './nowPlaying.css';

function NowPlaying() {
    const nowPlaying = useSelector(state => state.songs.nowPlaying)
    const { setFull, setPlayerState, playerState } = useNowPlaying();

    return (
        <div className='now_playing--wrapper'>
            <div className='now_playing_controls--wrapper'>
                <span className='now_playing_control'>
                    <TbArrowsShuffle/>
                </span>
                <span className='now_playing_control skip'>
                    <TbPlayerTrackPrevFilled/>
                </span>
                <span className='now_playing_control play'>
                {
                    playerState === 'pause' || playerState === "stop" ?
                    <span onClick={() => () => setPlayerState('play')} className='now_playing_control play'>
                        <TbPlayerPlayFilled/>
                    </span>
                     :
                     <span onClick={() => setPlayerState('pause')} className='now_playing_control play'>
                        <TbPlayerPauseFilled/>
                    </span>
                }
                </span>
                <span className='now_playing_control skip'>
                    <TbPlayerTrackNextFilled/>
                </span>
                <span className='now_playing_control'>
                    <TbRepeat/>
                </span>
            </div>
            <div className='now_playing_player--wrapper'>
                <div className='now_playing_player--image' style={nowPlaying?.Artist?.image &&  {backgroundImage: `url(${nowPlaying?.Artist?.image})`}}>

                </div>
                <div className='now_playing_player--song'>
                {
                    Object.values(nowPlaying).length ?
                    <span className='now_playing_player--name'>
                        <span className='now_playing_player--song'>{nowPlaying?.name}</span>
                        <span>-</span>
                        <span  className='now_playing_player--artist'>{nowPlaying?.Artist?.name}</span>
                    </span> :
                    null
                }
                </div>
                {
                    Object.values(nowPlaying).length ?
                    <span onClick={() => setFull(true)} className='now_playing_player--expand'>
                        <TbArrowsMaximize/>
                    </span> :
                    null
                }

            </div>
        </div>

    )
}

export default NowPlaying
