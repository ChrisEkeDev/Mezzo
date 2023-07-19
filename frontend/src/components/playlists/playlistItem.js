import React from 'react';
import { useHistory } from 'react-router-dom';
import mezzo from '../../assets/mezzo-placeholder.svg';
import { useNowPlaying } from '../../context/nowPlaying';
import IconButton from '../button/iconButton';
import { TbPlayerPlayFilled } from 'react-icons/tb';



function PlaylistItem({playlist}) {
    const history = useHistory();
    const { handlePlaySongs } = useNowPlaying();

    const navigate = (route) => {
        history.push(route);
    }

    const handlePlay = (e) => {
        e.stopPropagation();
        if (playlist.Songs.length) {
            handlePlaySongs(playlist.Songs)
        }
    }

    return (
        <article onClick={() => navigate(`/dashboard/playlists/${playlist?.id}`)} className='playlist_item--wrapper'>
            <div className='playlist_item--image'>
                {
                    playlist.Songs.slice(0,4).map(song => (
                        <div className='playlist_item--image_square' style={{backgroundImage: `url(${song?.Artist?.image})`}}>
                            { song?.Artist?.image ? null : <img src={mezzo}/>}
                        </div>
                    ))
                }
                <div className='playlist_item--overlay'>
                    <span className='playlist_item--play'>
                    <IconButton
                        style='primary'
                        icon={<TbPlayerPlayFilled/>}
                        action={(e) => handlePlay(e)}
                    />
                    </span>
                </div>
                {/*  */}
            </div>
            <h3 className='playlist_item--label'>{playlist.name}</h3>
        </article>
    )
}

export default PlaylistItem
