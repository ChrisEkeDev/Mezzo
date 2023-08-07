import React, { useState } from 'react'
import './favorites.css';
import placeholder from '../../assets/mezzo-placeholder.svg';
import ArtistItem from '../artists/artistItem';
import SongItem from '../songs/songItem';
import { useSelector } from 'react-redux';

function Favorites() {
    const user = useSelector(state => state.session.user);
    const [tab, setTab] = useState('artists');
    const songsData = useSelector(state => state.favorites.songs);
    const artistsData = useSelector(state => state.favorites.artists);
    const songs = Object.values(songsData);
    const artists = Object.values(artistsData);

    return (
        <div className='favorites--wrapper'>
            <header className={`favorites_header--wrapper ${tab === 'songs' && songs.length > 0 ? 'no-border' : ''}`}>
            <div className='favorites--header'>
                <div
                    onClick={() => setTab('artists')}
                    className={`favorites--tab ${tab === 'artists' ? 'active--tab' : ''}`}>
                    <span>Artists</span>
                </div>
                <div onClick={tab === 'artists' ? () => setTab('songs') : () => setTab('artists')} className={`favorites--toggle ${tab === 'artists' ? 'toggle--artists' : 'toggle--songs'}`}>
                    <div className="favorites--node"></div>
                </div>
                <div
                    onClick={() => setTab('songs')}
                    className={`favorites--tab ${tab === 'songs' ? 'active--tab' : ''}`}>
                    <span>Songs</span>
                </div>
            </div>
            {
                tab === 'songs' && songs.length > 0 ?
                <div className='songs--header favorites--songs'>
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
                </div> :
                null
            }
            </header>
            {
                tab === 'artists' ?
                    artists.length > 0 ?
                        <ul className='artists--list'>
                            {
                                artists.map(favorite => (
                                    <ArtistItem key={favorite.Artist.id} artist={favorite.Artist}/>
                                ))
                            }
                        </ul> :
                        <div className='no_content--wrapper'>
                            <div className='no_content--contents'>
                                <img src={placeholder}/>
                                <p>You haven't added any artists to your favorites.</p>
                            </div>
                        </div>
                :
                    songs.length > 0 ?
                        <ul className='songs--list'>
                            {
                                songs.map(favorite => (
                                    <SongItem key={favorite.Song.id}  artist={favorite.Song.Artist} isAuth={user.id === favorite.Song.Artist.userId} song={favorite.Song} />
                                ))
                            }
                        </ul> :
                        <div className='no_content--wrapper'>
                            <div className='no_content--contents'>
                                <img src={placeholder}/>
                                <p>You haven't added any songs to your favorites.</p>
                            </div>
                        </div>
            }
        </div>
  )
}

export default Favorites
