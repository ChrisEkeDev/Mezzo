import React from 'react';
import Search from '../../components/Search';
import SongItem from '../../components/SongItem';
import Scroll from '../../components/shared/Layout/Scroll';
import './styles.scss'

function Songs() {
    const songs = Array.from({ length: 20 }, (_, index) => index + 1);

    return (
        <div className="wrapper">
            <header className='header songs--header songs--header--open'>
                <span className='label song--name'>Song</span>
                <span className='label song--artist'>Artist</span>
                <span className='label song--genre'>Genre</span>
                <span className='label song--time'>Time</span>
            </header>
            <section className='wrapper'>
                <Scroll>
                    <ul className='list songs--list'>
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
