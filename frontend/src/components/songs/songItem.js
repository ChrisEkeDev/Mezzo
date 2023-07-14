import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../modal';
import IconButton from '../button/iconButton';
import { useDispatch } from 'react-redux';
import { thunkDeleteSong } from '../../store/songs';
import { thunkGetArtist } from '../../store/artists';
import Button from '../button';
import { TbPlayerPlayFilled, TbDots, TbEdit, TbTrash, TbX, TbHeartPlus, TbPlaylistAdd } from 'react-icons/tb';
import useOutsideClick from '../../hooks/useOutsideClick';

function SongItem({song, isAuth, artist}) {
    const [ deletingSong, setDeletingSong ] = useState(false);
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const deleteSong = () => {
        dispatch(thunkDeleteSong(song))
        .then(() => dispatch(thunkGetArtist(artist.id)))
    }

    return (
        <li className='song_item--wrapper song--grid'>
            <div className='song_item--name'>
                <div className='song_item--image' style={{backgroundImage: `url(${artist.image})`}}>

                </div>
                <span>{song.name}</span>
                <span onClick={() => setIsVisible(true)} className='song_item--icon'><TbDots/></span>
                {   isVisible ?
                        <div ref={ref} className='hover_menu--wrapper'>
                                <span onClick={() => alert('Feature coming soon.')} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Add to Playlist</span>
                                    <span className='hover_menu--icon'><TbPlaylistAdd/></span>
                                </span>
                            {
                                isAuth ?
                                <>
                                <span onClick={() => navigate(`/dashboard/artist/${artist.id}/songs/${song?.id}/update`)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Update Song</span>
                                    <span className='hover_menu--icon'><TbEdit/></span>
                                </span>
                                <span onClick={() => setDeletingSong(true)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Delete Song</span>
                                    <span className='hover_menu--icon'><TbTrash/></span>
                                </span>
                                </> :
                                null
                            }
                                <span onClick={() => alert('Feature coming soon.')} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Add to favorites</span>
                                    <span className='hover_menu--icon'><TbHeartPlus/></span>
                                </span>
                                <span onClick={() => setIsVisible(false)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Close</span>
                                    <span className='hover_menu--icon'><TbX/></span>
                                </span>

                        </div> :
                        null
                    }
            </div>
                {
                    deletingSong ?
                    <Modal>
                        <div className='confirm--wrapper'>
                            <div className='confirm--close'>
                                <IconButton
                                    style='close'
                                    icon={<TbX/>}
                                    action={() => setDeletingSong(false)}
                                />
                            </div>
                            <div className='confirm--content'>
                                <h2>Are you sure you want to delete this song?</h2>
                                <p>This can't be undone.</p>
                            </div>
                            <div className='confirm--actions'>
                                <Button
                                    label="Cancel"
                                    style="cancel"
                                    action={() => setDeletingSong(false)}
                                />
                                <Button
                                    label="Delete"
                                    style="delete"
                                    action={deleteSong}
                                    right={<TbTrash/>}
                                />
                            </div>
                        </div>
                    </Modal> :
                    null
                }
            <div className='song_item--artist' onClick={() => navigate(`/dashboard/artist/${artist.id}`)}>{artist.name}</div>
            <div className='song_item--genre'>{song.Genre.name}</div>
            <div className='song_item--time'>0:00</div>
        </li>
    )
}

export default SongItem
