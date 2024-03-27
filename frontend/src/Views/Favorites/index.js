import React from 'react';
import Scroll from '../../components/Shared/Layout/Scroll';
import ArtistListItem from '../../components/ArtistListItem';
import SongListItem from '../../components/SongListItem';
import './styles.scss';

function Favorites() {
    const favorites = Array.from({ length: 20 }, (_, index) => index + 1);

    return (
        <div className='wrapper'>
            <header className='header'>
                <span className='label'>Favorites</span>
            </header>
            <section>
                <Scroll>
                    <ul className='list favorites--list'>
                        {favorites.map((favorite, i) => {
                            if (i % 3 === 0) {
                                return (<ArtistListItem artist={favorite}/>)
                            } else {
                                return (<SongListItem song={favorite}/>)
                            }
                        })}
                    </ul>
                </Scroll>
            </section>
        </div>
    )
}

export default Favorites
