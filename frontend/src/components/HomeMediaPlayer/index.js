import React, { useEffect, useState, useRef } from 'react';
import placeholder from '../../assets/placeholder_artist.svg'
import { AnimatePresence, motion } from 'framer-motion';
import {
  PiSpeakerSimpleNoneFill, PiSpeakerSimpleHighFill, PiSpeakerSimpleLowFill,
  PiSpeakerSimpleSlashFill, PiArrowsInFill, PiArrowsOutFill,
  PiPlayFill, PiRepeatBold, PiRepeatOnceBold, PiShuffleBold ,
  PiPauseBold, PiSkipForwardFill, PiSkipBackFill
} from 'react-icons/pi'
import { useMediaContext } from '../../context/MediaContext';
import IconButton from '../shared/Buttons/IconButton';
import { inOut, mediaInOut } from '../../constants/animations';
import Media from '../Media';
import './styles.scss';

function MediaPlayer() {
  const { mediaControls } = useMediaContext();

  const [ volume, setVolume ] = useState('low')
  const [ layout, setLayout ] = useState("bar")
  const [ isPlaying, setIsPlaying] = useState(false);
  const [ repeat, setRepeat ] = useState('none');
  const [ shuffle, setShuffle ] = useState(false);

  return (
    <>
      <Media/>
      <div className='media--wrapper'>
        <div className='media--container'>
          <div className='media--visualizer'>
            <AnimatePresence mode="wait">
              <motion.div className='media--info' {...inOut} variants={mediaInOut} >
              <img src={placeholder} className='media--img'/>
              <div className='flex-col'>
                  <span className='bold'>Over (Freestyle)</span>
                  <span className='label'>Pim</span>
              </div>
              </motion.div>
            </AnimatePresence>
            <div className='media--controls'>
              <AnimatePresence mode="wait">
                {
                  mediaControls.repeat ?
                  <IconButton
                    key="repeat-one"
                    styles="icon_button--no_shadow accent"
                    action={() => mediaControls.toggleRepeat()}
                    icon={PiRepeatOnceBold}
                  /> :
                  <IconButton
                    key="repeat-none"
                    styles="icon_button--off icon_button--no_shadow"
                    action={() => mediaControls.toggleRepeat()}
                    icon={PiRepeatBold}
                  />
                }
              </AnimatePresence>
              <IconButton
                styles="icon_button--no_shadow"
                action={() => console.log('Skip Back')}
                icon={PiSkipBackFill}
              />
              <AnimatePresence mode="wait">
              {
                  mediaControls.isPlaying ?
                  <IconButton
                    key='pause'
                    action={() => mediaControls.togglePlay()}
                    styles='media--play'
                    icon={PiPauseBold}
                  /> :
                  <IconButton
                    key='play'
                    styles='media--play'
                    action={() => mediaControls.togglePlay()}
                    icon={PiPlayFill}
                  />
              }
              </AnimatePresence>
              <IconButton
                styles="icon_button--no_shadow"
                action={() => console.log('Skip Forward')}
                icon={PiSkipForwardFill}
              />
              <AnimatePresence mode="wait">
                {
                  shuffle ?
                  <IconButton
                    key="shuffle-on"
                    styles="icon_button--no_shadow"
                    action={() => setShuffle(false)}
                    icon={PiShuffleBold}
                  />
                  :
                  <IconButton
                    key="shuffle-off"
                    styles="icon_button--off icon_button--no_shadow"
                    action={() => setShuffle(true)}
                    icon={PiShuffleBold}
                  />
                }
              </AnimatePresence>
              <div className='media--volume'>
                    <IconButton
                      styles="icon_button--no_shadow"
                      icon={
                        mediaControls.volume === 0 ?
                        PiSpeakerSimpleSlashFill :
                        mediaControls.volume > 30 ?
                        PiSpeakerSimpleLowFill :
                        mediaControls.volume >= 30 && mediaControls.vloume < 60 ?
                        PiSpeakerSimpleNoneFill :
                        mediaControls.mute ?
                        PiSpeakerSimpleSlashFill :
                        PiSpeakerSimpleHighFill
                      }
                      key="muted"
                      action={() => mediaControls.toggleMute()}
                    />
                <div className='media_player--sound_bar'/>
              </div>
              <div className='media--expand'>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MediaPlayer
