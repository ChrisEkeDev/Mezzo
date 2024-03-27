import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import NowPlayingAnimation from '../Shared/NowPlayingAnimation';
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../Shared/Buttons/IconButton';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi';
import { useMediaContext } from '../../Context/MediaContext';
import './styles.scss';

function SongListItem({song}) {
  const [ isHovering, setIsHovering ] = useState(false);
  const { mediaControls, mediaData } = useMediaContext();
  const { playNow } = mediaControls;
  const { progress, duration, isPlaying } = mediaData;


  const currentSong = song?.id === mediaData?.song?.id;
  const currentSongPlaying = currentSong && isPlaying;

  return (
    <li
      className='song_list_item--wrapper list_item'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {
        currentSongPlaying ?
        <NowPlayingAnimation /> :
        <AnimatePresence>
          {
            isHovering &&
            <IconButton
              styles='list_item--play icon_button--no_shadow accent'
              icon={PiPlayFill}
              action={() => playNow(song)}
            />
          }
        </AnimatePresence>
      }

      <img className='song_list_item--image' src={placeholder}/>
      <div className='flex-col'>
        <span className='md bold'>Song List Item {song}</span>
        <span className='sm'>Artist Name {song}</span>
      </div>

      <AnimatePresence>
        {
          isHovering &&
          <IconButton
            styles='list_item--options icon_button--no_shadow'
            icon={PiNotchesBold}
            action={() => alert(`Open Options for Song ${song}`)}
          />
        }
      </AnimatePresence>

      {
        currentSong &&
        <div
            className="song_item--progress"
            style={{width: `${Math.floor((progress / duration) * 100)}%`}}
        />
      }

    </li>
  )
}

export default SongListItem
