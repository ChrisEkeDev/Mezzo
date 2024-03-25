import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../../components/shared/Buttons/IconButton';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';

function SongItem({song}) {
  const [ isHovering, setIsHovering ] = useState(false);
  return (
    <motion.li
      className='song_item--wrapper list_item'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='song_item--flex song--name'>
        <AnimatePresence>
          {
            isHovering &&
            <IconButton
              key={0}
              styles='song_item--play icon_button--no_shadow accent'
              icon={PiPlayFill}
              action={() => alert(`Play Song ${song}`)}
            />
          }
        </AnimatePresence>
        <img className="song_item--image" src={placeholder}/>
        <span className="song_item--label sm bold">Song {song}</span>
        <AnimatePresence>
          {
            isHovering &&
            <IconButton
              key={0}
              styles='song_item--options icon_button--no_shadow'
              icon={PiNotchesBold}
              action={() => alert(`Open Options ${song}`)}
            />
          }
        </AnimatePresence>
      </div>
      <div className='song_item--flex song--artist'>
        <span className="label">Artist {song}</span>
      </div>
      <div className='song_item--flex song--genre'>
        <span className="label">Genre {song}</span>
      </div>
      <div className='song_item--flex song--time'>
        <span className="label">Time {song}</span>
      </div>
    </motion.li>
  )
}

export default SongItem
