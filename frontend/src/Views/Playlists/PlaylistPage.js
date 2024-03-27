import React from 'react';
import { PiShuffleBold, PiPlaylistFill } from 'react-icons/pi';
import Button from '../../components/Shared/Buttons/Button'
import SongItem from '../../components/SongItem';
import { useParams } from 'react-router-dom';
import Scroll from '../../components/Shared/Layout/Scroll';
import './styles.scss';

function PlaylistPage() {
  const { playlistId } = useParams();
  const songs = Array.from({ length: 10 }, (_, index) => index + 1);


  return (
    <div className="playlist_page--wrapper">
      <header className='header'>
          <span className='label'>PlaylistPage {playlistId}</span>
      </header>
      <section className='playlist_page--wrapper dashboard_page--wrapper'>
        <Scroll>
          <header className='artist_page--header'>
            <div className='artist_page--nav'>
              <div className='artist_page--background'>
              <div className='artist_page--details'>
                <h1 className='artist_page--name'>Playlist Name {playlistId}</h1>
                <div className='artist_page--actions'>
                  <Button
                    label="Shuffle"
                    styles="primary"
                    right={PiShuffleBold}
                    action={() => alert("Shuffle PLaylist Songs")}
                  />
                  <Button
                    label="Edit Playlist"
                    styles="secondary"
                    right={PiPlaylistFill}
                    action={() => alert("Go To Edit Playlist Page")}
                  />
                </div>
              </div>
              </div>
            </div>
            <div className='header songs--header'>
              <span className='label song--name'>Song</span>
              <span className='label song--artist'>Artist</span>
              <span className='label song--genre'>Genre</span>
              <span className='label song--time'>Time</span>
            </div>
          </header>
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

export default PlaylistPage
