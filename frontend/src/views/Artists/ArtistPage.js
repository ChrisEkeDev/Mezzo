import React from 'react';
import { useParams } from 'react-router-dom';
import { PiShuffleBold, PiHeartFill } from 'react-icons/pi';
import Button from '../../components/shared/Buttons/Button'
import placeholder from '../../assets/placeholder_artist.svg'
import SongItem from '../../components/SongItem';
import Scroll from '../../components/shared/Layout/Scroll';
import './styles.scss';

function ArtistPage() {
  const { artistId } = useParams();
  const songs = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="wrapper artist_page--wrapper">
      <header className='header'>
          <span className='label'>Artist Page {artistId}</span>
      </header>
      <section className='artist_page--wrapper dashboard_page--wrapper'>
        <Scroll>
          <header className='artist_page--header'>
            <div className='artist_page--nav'>
              <div className='artist_page--background'>
              <div className='artist_page--details'>
                <h1 className='artist_page--name'>Artist Name</h1>
                <div className='artist_page--actions'>
                  <Button
                    label="Shuffle"
                    styles="primary"
                    right={PiShuffleBold}
                    action={() => alert("Shuffle Artists Songs")}
                  />
                  <Button
                    label="Add to Favorites"
                    styles="secondary"
                    right={PiHeartFill}
                    action={() => alert("Add Artist to Favorites")}
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

export default ArtistPage
