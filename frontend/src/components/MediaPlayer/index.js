import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { inOut, mediaInOut  } from '../../constants/animations';
import { PiSpeakerNoneFill,PiSpeakerHighFill, PiSpeakerLowFill, PiArrowsInFill, PiArrowsOutFill, PiPlayFill, PiRepeatBold, PiRepeatOnceBold, PiShuffleBold , PiPauseFill, PiSkipForwardFill, PiSkipBackFill } from 'react-icons/pi'
import IconButton from '../../components/shared/Buttons/IconButton';
import './styles.scss';

function MediaPlayer() {
  const [ volume, setVolume ] = useState('low')
  const [ layout, setLayout ] = useState("bar")
  const [ isPlaying, setIsPlaying] = useState(false);
  const [ repeat, setRepeat ] = useState('none');
  const [ shuffle, setShuffle ] = useState(false);

  return (
    <div className={`media_player--wrapper ${layout}`}>
      <div className='media_player--controls'>
          <AnimatePresence mode="wait">
            {
              repeat === 'all' ?
              <IconButton
                key="repeat-all"
                styles="icon_button--small"
                action={() => setRepeat('none')}
                icon={PiRepeatBold}
              /> :
              repeat === "one" ?
              <IconButton
                key="repeat-one"
                styles="icon_button--small"
                action={() => setRepeat('all')}
                icon={PiRepeatOnceBold}
              /> :
              <IconButton
                key="repeat-none"
                styles="icon_button--off icon_button--small"
                action={() => setRepeat('one')}
                icon={PiRepeatBold}
              />
            }

          </AnimatePresence>
          <IconButton
            action={() => console.log('Skip Back')}
            icon={PiSkipBackFill}
          />
          <AnimatePresence mode="wait">
          {
              isPlaying ?
              <IconButton
                key='pause'
                action={() => setIsPlaying(false)}
                icon={PiPauseFill}
              /> :
              <IconButton
                key='play'
                action={() => setIsPlaying(true)}
                icon={PiPlayFill}
              />
          }
          </AnimatePresence>
          <IconButton
            action={() => console.log('Skip Forward')}
            icon={PiSkipForwardFill}
          />
          <AnimatePresence mode="wait">
            {
              shuffle ?
              <IconButton
                key="shuffle-on"
                styles="icon_button--small"
                action={() => setShuffle(false)}
                icon={PiShuffleBold}
              />
               :
               <IconButton
                key="shuffle-off"
                styles="icon_button--off icon_button--small"
                action={() => setShuffle(true)}
                icon={PiShuffleBold}
              />
            }
          </AnimatePresence>
      </div>
      <div className='media_player--info'>
            <div className='media_player--image'/>
            <AnimatePresence mode="wait">
              <motion.p className='media_player--song' {...inOut} variants={mediaInOut}>
                <strong>Song Name</strong> - Song Artist
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {
                layout === 'bar' ?
                <IconButton
                  key="bar-layout"
                  icon={PiArrowsOutFill}
                  action={() => setLayout('full')}
                /> :
                <IconButton
                  key="full-layout"
                  icon={PiArrowsInFill}
                  action={() => setLayout('bar')}
                />
              }
            </AnimatePresence>
      </div>
      <div className='media_player--volume'>
              <AnimatePresence mode="wait">
                {
                  volume === 'off' ?
                  <IconButton
                    key="volume-off"
                    icon={PiSpeakerNoneFill}
                    action={() => setVolume('low')}
                  /> :
                  volume === 'high' ?
                  <IconButton
                    key="volume-low"
                    icon={PiSpeakerHighFill}
                    action={() => setVolume('high')}
                  /> :
                  <IconButton
                    key="volume-high"
                    icon={PiSpeakerLowFill}
                    action={() => setVolume('off')}
                  />
                }
              </AnimatePresence>
              <div className='media_player--sound_bar'/>
            </div>
    </div>
  )
}

export default MediaPlayer
