import React, { useState } from 'react'
import './favorites.css';
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

    console.log({songs, artists})

    return (
        <div className='favorites--wrapper'>
            <header className={`favorites_header--wrapper ${tab === 'songs' ? 'no-border' : ''}`}>
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
                tab === 'songs' ?
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
                <ul className='artists--list'>
                    {
                        artists.map(favorite => (
                            <ArtistItem key={favorite.Artist.id} artist={favorite.Artist}/>
                        ))
                    }
                </ul> :
                <ul className='songs--list'>
                    {
                        songs.map(favorite => (
                            <SongItem key={favorite.Song.id}  artist={favorite.Song.Artist} isAuth={user.id === favorite.userId} song={favorite.Song} />
                        ))
                    }
                </ul>
            }
        </div>
  )
}

export default Favorites
