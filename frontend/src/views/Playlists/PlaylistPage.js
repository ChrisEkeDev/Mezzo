import React from 'react';
import { useParams } from 'react-router-dom';
import Scroll from '../../components/shared/Layout/Scroll';
import './styles.scss';

function PlaylistPage() {
  const { playlistId } = useParams();

  return (
    <div className="playlist_page--wrapper">
      <header className='header'>
          <span className='label'>PlaylistPage {playlistId}</span>
      </header>
      <section className='playlist_page--wrapper dashboard_page--wrapper'>
        <Scroll>

        </Scroll>
      </section>
  </div>
  )
}

export default PlaylistPage
