import React from 'react';
import Search from '../../components/Search';
import Scroll from '../../components/shared/Layout/Scroll';
import ArtistItem from '../../components/ArtistItem';
import './styles.scss';

function Artists() {
  const artists = Array.from({ length: 50 }, (_, index) => index + 1);

  return (
    <div className="artists--wrapper">
      <header className='header'>
        <span className='label'>Artists</span>
      </header>
      <section className='artists--wrapper wrapper'>
        <Scroll>
          <ul className='artists--list'>
            {artists.map(artist => (
              <ArtistItem artist={artist} />
            ))}
          </ul>
        </Scroll>
      </section>
    </div>
  )
}

export default Artists
