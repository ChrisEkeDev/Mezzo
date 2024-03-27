import React from 'react';
import SongItem from '../../components/SongItem';
import { songsDemoData } from '../../Constants/songsDemo';
import Scroll from '../../components/Shared/Layout/Scroll';
import './styles.scss'

function Songs() {

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
                        {songsDemoData.map(song => (
                            <SongItem
                                key={song.id}
                                song={song}
                            />
                        ))}
                    </ul>
                </Scroll>
            </section>
        </div>
    )
}

export default Songs
