import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingData from '../loading/loadingData';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetArtist, thunkDeleteArtist } from '../../store/artists';
import Modal from '../modal';
import placeholder from '../../assets/mezzo-placeholder.svg'
import useOutsideClick from '../../hooks/useOutsideClick';
import './artists.css';
import IconButton from '../button/iconButton';
import Button from '../button';
import { TbPlayerPlayFilled, TbDots, TbEdit, TbTrash, TbX, TbHeartPlus } from 'react-icons/tb';

function Artist() {
    const user = useSelector(state => state.session.user);
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const [ loading, setLoading ] = useState(true);
    const [ deletingArtist, setDeletingArtist ] = useState(false)
    const { id } = useParams();
    const artist = useSelector(state => state.artists.current)
    const history = useHistory();
    const dispatch = useDispatch();



    const navigate = (route) => {
        history.push(route);
    }

    const deleteArtist = () => {
        dispatch(thunkDeleteArtist(artist))
        .then(() => navigate('/dashboard/artists'))
    }

    useEffect(() => {
        dispatch(thunkGetArtist(id))
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !artist) return <LoadingData></LoadingData>

    const isAuth = user.id === artist.User.id;

    return (
        <div className='artist--wrapper'>
            <header className='artist_header--wrapper'>
                <div className='artist_header--contents'>
                <div className='artist--image' style={{backgroundImage: `url(${artist?.image})`}}>
                    {artist?.image ? null : <img src={placeholder}/> }
                </div>
                <div className='artist--data'>
                    <div className='artist--text'>
                        <h1>{artist?.name}</h1>
                        <p>{artist?.bio}</p>
                    </div>
                    <IconButton
                        style='primary'
                        icon={<TbPlayerPlayFilled/>}
                        action={() => alert('Feature coming soon.')}
                    />
                </div>
                </div>
                <div onClick={() => setIsVisible(true)} className='artist_manage--wrapper'>
                    <span className='artist_manage--title'>Manage Artist</span>
                    <IconButton
                        style='secondary'
                        icon={<TbDots/>}
                    />
                    {   isVisible ?
                        <div ref={ref} className='hover_menu--wrapper'>
                            {
                                isAuth ?
                                <>
                                <span onClick={() => navigate(`/dashboard/artist/${artist?.id}/update`)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Update Artist</span>
                                    <span className='hover_menu--icon'><TbEdit/></span>
                                </span>
                                <span onClick={() => setDeletingArtist(true)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Delete Artist</span>
                                    <span className='hover_menu--icon'><TbTrash/></span>
                                </span>
                                </> :
                                null
                            }
                                <span onClick={() => alert('Feature coming soon.')} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Add to favorites</span>
                                    <span className='hover_menu--icon'><TbHeartPlus/></span>
                                </span>

                        </div> :
                        null
                    }
                </div>
                {
                    deletingArtist ?
                    <Modal>
                        <div className='confirm--wrapper'>
                            <div className='confirm--close'>
                                <IconButton
                                    style='close'
                                    icon={<TbX/>}
                                    action={() => setDeletingArtist(false)}
                                />
                            </div>
                            <div className='confirm--content'>
                                <h2>Are you sure you want to delete this artist?</h2>
                                <p>This can't be undone and all of their songs will be deleted.</p>
                            </div>
                            <div className='confirm--actions'>
                                <Button
                                    label="Cancel"
                                    style="cancel"
                                    action={() => setDeletingArtist(false)}
                                />
                                <Button
                                    label="Delete"
                                    style="delete"
                                    action={deleteArtist}
                                    right={<TbTrash/>}
                                />
                            </div>
                        </div>
                    </Modal> :
                    null
                }
            </header>
        </div>
    )
}

export default Artist
