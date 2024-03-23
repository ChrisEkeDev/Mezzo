import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../../components/shared/Buttons/IconButton';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';

function SongListItem({song}) {
  const [ isHovering, setIsHovering ] = useState(false);
  return (
    <li
      className='song_list_item--wrapper list_item'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence>
        {
          isHovering &&
          <IconButton
            key={0}
            styles='list_item--play icon_button--no_shadow'
            icon={PiPlayFill}
            action={() => alert(`Play Song ${song}`)}
          />
        }
      </AnimatePresence>

      <img className='song_list_item--image' src={placeholder}/>
      <div className='flex-col'>
        <span className='md bold'>Song List Item {song}</span>
        <span className='sm'>Artist Name {song}</span>
      </div>

      <AnimatePresence>
        {
          isHovering &&
          <IconButton
            key={0}
            styles='list_item--options icon_button--no_shadow'
            icon={PiNotchesBold}
            action={() => alert(`Open Options ${song}`)}
          />
        }
      </AnimatePresence>

    </li>
  )
}

export default SongListItem
