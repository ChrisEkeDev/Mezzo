import React from 'react';
import Scroll from '../../components/shared/Layout/Scroll';
import PlaylistItem from '../../components/PlaylistItem';
import './styles.scss';

function Playlists() {
    const playlists = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="wrapper">
      <header className='header'>
        <span className='label'>Playlists</span>
      </header>
      <section className='wrapper'>
        <Scroll>
          <ul className='list playlists--list'>
            {playlists.map(playlist => (
              <PlaylistItem playlist={playlist} />
            ))}
          </ul>
        </Scroll>
      </section>
    </div>
  )
}

export default Playlists
