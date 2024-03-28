import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../Shared/Buttons/IconButton';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi';
import { COLORS } from '../../Constants';
import { useMediaContext } from '../../Context/MediaContext';
import { pulse } from '../../Constants/animations';
import './styles.scss';


function SongItem({song}) {
  const [ isHovering, setIsHovering ] = useState(false);
  const { mediaControls, mediaData } = useMediaContext();
  const { playNow } = mediaControls;
  const { progress, duration, isPlaying } = mediaData;

  const currentSong = song?.id === mediaData?.song?.id;
  const currentSongPlaying = currentSong && isPlaying;

  return (
    <motion.li
      className='song_item--wrapper list_item'
      style={{backgroundColor: currentSong && COLORS.SELECTED}}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='song_item--flex song--name'>

          <AnimatePresence>
          {
            ( isHovering || !currentSongPlaying ) &&
            <IconButton
              styles='song_item--play icon_button--no_shadow accent'
              icon={PiPlayFill}
              action={() => playNow(song)}
            />
          }
          </AnimatePresence>

        <motion.img animate={currentSongPlaying && pulse} className="song_item--image" src={placeholder}/>
        <motion.span animate={currentSongPlaying && pulse} className="song_item--label sm bold">{song.name}</motion.span>
        <AnimatePresence>
          {
            isHovering &&
            <IconButton
              styles='song_item--options icon_button--no_shadow'
              icon={PiNotchesBold}
              action={() => alert(`Open Options for ${song.name}`)}
            />
          }
        </AnimatePresence>
      </div>
      <div className='song_item--flex song--artist'>
        <span className="label">{song.artist}</span>
      </div>
      <div className='song_item--flex song--genre'>
        <span className="label">{song.genre}</span>
      </div>

      {
        currentSong &&
        <div
            className="song_item--progress"
            style={{width: `${Math.floor((progress / duration) * 100)}%`}}
        />
      }

    </motion.li>
  )
}

export default SongItem
