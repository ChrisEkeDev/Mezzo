import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PiPlayFill, PiPauseFill, PiSkipForwardFill } from "react-icons/pi";
import './styles.scss';
import IconButton from '../shared/Buttons/IconButton';
import { inOut, mediaInOut } from '../../constants/animations';

function HomeMediaPlayer() {
  const [idx, setIdx] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ songs, setSongs ] = useState([{
      name: 'Song Name 1',
      artist: 'Artist Name 1'
    },
    {
      name: 'Song Name 2',
      artist: 'Artist Name 2'
    }
    ,
    {
      name: 'Song Name 3',
      artist: 'Artist Name 3'
    },
    {
      name: 'Song Name 4',
      artist: 'Artist Name 4'
    },
    {
      name: 'Song Name 5',
      artist: 'Artist Name 5'
    }
  ])

  const handleNext = () => {
    if (idx === songs.length - 1) {
      setIdx(0)
    } else {
      setIdx(prev => prev + 1)
    }
  }



  const song = songs[idx];

  return (
    <div className='media--wrapper'>
        <div className='media--img'/>
        <div className='media--info'>
          <AnimatePresence mode="wait">
            {
              isPlaying ?
              <IconButton key='pause' action={() => setIsPlaying(false)} icon={PiPauseFill}/> :
              <IconButton key='play' action={() => setIsPlaying(true)} icon={PiPlayFill}/>
            }
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p className='media--song' {...inOut} variants={mediaInOut} key={idx}>
              <strong>{song.name}</strong> - {song.artist}
            </motion.p>
          </AnimatePresence>
          <IconButton action={handleNext} icon={PiSkipForwardFill}/>
        </div>
    </div>
  )
}

export default HomeMediaPlayer
