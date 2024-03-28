import React from 'react';
import Scroll from '../../components/Shared/Layout/Scroll';
import ArtistItem from '../../components/ArtistItem';
import './styles.scss';

function Artists() {
  const artists = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="wrapper">
      <header className='header'>
        <span className='label'>Artists</span>
      </header>
      <section className='wrapper'>
        <Scroll>
          <ul className='list artists--list'>
            {artists.map((artist, i) => (
              <ArtistItem  key={i} artist={artist} />
            ))}
          </ul>
        </Scroll>
      </section>
    </div>
  )
}

export default Artists
