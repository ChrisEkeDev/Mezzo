import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingData from '../loading/loadingData';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetArtist, thunkDeleteArtist } from '../../store/artists';
import { thunkAddArtistToFavorites, thunkRemoveArtistFromFavorites } from '../../store/favorites';
import Modal from '../modal';
import placeholder from '../../assets/mezzo-placeholder.svg'
import useOutsideClick from '../../hooks/useOutsideClick';
import './artists.css';
import IconButton from '../button/iconButton';
import SongItem from '../songs/songItem';
import Button from '../button';
import { TbPlayerPlayFilled, TbDots, TbEdit, TbTrash, TbX, TbHeartPlus, TbPlus, TbHeartFilled, TbHeartMinus } from 'react-icons/tb';

function Artist() {
    const user = useSelector(state => state.session.user);
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const [ loading, setLoading ] = useState(true);
    const [ deletingArtist, setDeletingArtist ] = useState(false)
    const { id } = useParams();
    const favoritesData = useSelector(state => state.favorites.artists);
    const favorites = Object.values(favoritesData)
    const artist = useSelector(state => state.artists.current)
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const isFavorited = favorites.some(favorite => favorite.artistId === artist.id);

    const deleteArtist = () => {
        dispatch(thunkDeleteArtist(artist))
        .then(() => navigate('/dashboard/artists'))
    }

    const handleAddFavorite = (id) => {
        dispatch(thunkAddArtistToFavorites({artistId: id}))
        .then(setIsVisible(false))
    }

    const handleRemoveFavorite = (id) => {
        dispatch(thunkRemoveArtistFromFavorites({artistId: id}))
        .then(setIsVisible(false))
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
                        <span className='artist--text_span'>
                            <h1>{artist?.name}</h1>
                            { isFavorited ? <span className='artist--favorite'><TbHeartFilled/></span> : null }
                        </span>
                        <p>{artist?.bio}</p>
                    </div>
                    <IconButton
                        style='primary'
                        icon={<TbPlayerPlayFilled/>}
                        action={() => alert('Feature coming soon.')}
                    />
                </div>
                </div>
                <div className='artist_manage--wrapper'>
                    <div className='artist_manage--label' onClick={() => setIsVisible(true)}>
                        <span className='artist_manage--title'>Manage Artist</span>
                        <IconButton
                            style='secondary'
                            icon={<TbDots/>}

                        />
                    </div>

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
                            {
                                isFavorited ?
                                <span onClick={() => handleRemoveFavorite(artist.id)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Remove from favorites</span>
                                    <span className='hover_menu--icon'><TbHeartMinus/></span>
                                </span> :
                                <span onClick={() => handleAddFavorite(artist.id)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Add to favorites</span>
                                    <span className='hover_menu--icon'><TbHeartPlus/></span>
                                </span>
                            }

                                <span onClick={() => setIsVisible(false)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Close</span>
                                    <span className='hover_menu--icon'><TbX/></span>
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
            <section className='artist_songs--wrapper'>
                <header className='artist_songs--header'>
                    <div className='artist_songs--top_header'>
                    { isAuth ?
                        <Button
                            label='New Song'
                            style='new-artist'
                            left={<TbPlus/>}
                            action={() => navigate(`/dashboard/artist/${artist.id}/new-song`)}
                        /> :
                        null
                    }
                    </div>
                    <div className=''>
                        <div className='songs_header--wrapper song--grid'>
                            <span>Song</span>
                            <span className='songs_header--label'>
                                <span>Artist</span>
                            </span>
                            <span className='songs_header--label'>
                                <span>Genre</span>
                            </span>
                            <span className='songs_header--label'>
                                <span>Time</span>
                            </span>
                        </div>
                    </div>
                </header>
                <ul className='songs--list'>
                    {
                        artist.Songs.map(song => (
                            <SongItem key={song.id} artist={artist} isAuth={user.id === artist.User.id} song={song} />
                        ))
                    }
                </ul>
            </section>
        </div>
    )
}

export default Artist
