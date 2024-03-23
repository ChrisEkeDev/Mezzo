import React from 'react';
import Search from '../../components/Search';
import SongItem from '../../components/SongItem';
import Scroll from '../../components/shared/Layout/Scroll';
import './styles.scss'

function Songs() {
    const songs = Array.from({ length: 20 }, (_, index) => index + 1);

    return (
        <div className="spngs--wrapper">
            <header className='songs--header'>
                <span className='label song_name'>Song</span>
                <span className='label song_artist'>Artist</span>
                <span className='label song_genre'>Genre</span>
                <span className='label song_time'>Time</span>
            </header>
            <section className='songs--wrapper dashboard_page--wrapper'>
                <Scroll styles='songs_scroll_height'>
                    <ul className='songs--list'>
                        {songs.map(song => (
                            <SongItem song={song} />
                        ))}
                    </ul>
                </Scroll>
            </section>
        </div>
    )
}

export default Songs
