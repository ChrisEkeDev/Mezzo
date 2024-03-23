import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../../components/shared/Buttons/IconButton';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';

function ArtistItem({artist}) {
  const [ isHovering, setIsHovering ] = useState(false);

  return (
    <li
      className='artist_item--wrapper'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      <AnimatePresence>
        {
          isHovering &&
          <IconButton
            key={0}
            styles='artist_item--play icon_button--no_shadow'
            icon={PiPlayFill}
            action={() => alert(`Play Artist ${artist}`)}
          />
        }
      </AnimatePresence>

      <img className='artist_item--image' src={placeholder}/>
      <span className='artist_item--artist'>Artist {artist}</span>

      <AnimatePresence>
        {
          isHovering &&
          <IconButton
            key={0}
            styles='artist_item--options icon_button--no_shadow'
            icon={PiNotchesBold}
            action={() => alert(`Open Options ${artist}`)}
          />
        }
      </AnimatePresence>

    </li>
  )
}

export default ArtistItem
