import React from 'react';
import { motion } from 'framer-motion';
import { useMediaContext } from '../../Context/MediaContext';
import NewPlaylistItem from '../../components/NewPlaylistItem';
import Button from '../../components/Shared/Buttons/Button';
import Scroll from '../../components/Shared/Layout/Scroll';
import './styles.scss';

function NowPlaying() {
  const { mediaControls, mediaData } = useMediaContext();
  const { playAll, clearQueue } = mediaControls;
  const { queue, song } = mediaData;


  return (
    <div className='wrapper'>
      <header className='header'>
          <span className='label'>
              Now Playing {song?.name} by {song?.artist}
          </span>
      </header>
      <section className='wrapper now_playing--wrapper'>
          <div className='wrapper now_playing--console'>
            <Button
              label="Play All Songs"
              action={() => playAll()}
            />
            <Button
              label="Clear Queue"
              action={() => clearQueue()}
            />
          </div>
          <div className='wrapper now_playing--queue'>
            <Scroll>
              <motion.ul
                  className='list songs--list'
              >
                  {queue.map(song => (
                      <NewPlaylistItem
                          key={song.id}
                          song={song}
                      />
                  ))}
              </motion.ul>
          </Scroll>
          </div>
      </section>
    </div>
  )
}

export default NowPlaying
