import React from 'react';
import { useHistory } from 'react-router-dom';
import mezzo from '../../assets/mezzo-placeholder.svg';
import { useDispatch } from 'react-redux';
import { thunkSetNowPlaying } from '../../store/songs';
import IconButton from '../button/iconButton';
import { TbPlayerPlayFilled } from 'react-icons/tb';



function PlaylistItem({playlist}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const handlePlay = (e) => {
        e.stopPropagation();
        dispatch(thunkSetNowPlaying(playlist.Songs))
    }

    return (
        <article onClick={() => navigate(`/dashboard/playlists/${playlist?.id}`)} className='playlist_item--wrapper'>
            <div className='playlist_item--image'>
                <div className='playlist_item--overlay'>
                    <span className='playlist_item--play'>
                    <IconButton
                        style='primary'
                        icon={<TbPlayerPlayFilled/>}
                        action={(e) => handlePlay(e)}
                    />
                    </span>
                </div>
                <img src={mezzo}/>
            </div>
            <h3 className='playlist_item--label'>{playlist.name}</h3>
        </article>
    )
}

export default PlaylistItem
