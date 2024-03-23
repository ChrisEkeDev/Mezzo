import React, { useEffect, useState, useRef } from 'react';
import placeholder from '../../assets/placeholder_artist.svg'
import { AnimatePresence, motion } from 'framer-motion';
import { PiSpeakerNoneFill, PiSpeakerHighFill, PiSpeakerLowFill, PiSpeakerSlashFill, PiArrowsInFill, PiArrowsOutFill, PiPlayFill, PiRepeatBold, PiRepeatOnceBold, PiShuffleBold , PiPauseFill, PiSkipForwardFill, PiSkipBackFill } from 'react-icons/pi'
import { useMediaContext } from '../../context/MediaContext';
import IconButton from '../shared/Buttons/IconButton';
import MediaVisualizer from '../MediaVisualizer';
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
            <MediaVisualizer/>
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
                  repeat === 'all' ?
                  <IconButton
                    key="repeat-all"
                    action={() => setRepeat('none')}
                    icon={PiRepeatBold}
                  /> :
                  repeat === "one" ?
                  <IconButton
                    key="repeat-one"
                    action={() => setRepeat('all')}
                    icon={PiRepeatOnceBold}
                  /> :
                  <IconButton
                    key="repeat-none"
                    styles="icon_button--off"
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
                  mediaControls.isPlaying ?
                  <IconButton
                    key='pause'
                    action={() => mediaControls.togglePlay()}
                    styles='media--play'
                    icon={PiPauseFill}
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
                action={() => console.log('Skip Forward')}
                icon={PiSkipForwardFill}
              />
              <AnimatePresence mode="wait">
                {
                  shuffle ?
                  <IconButton
                    key="shuffle-on"
                    action={() => setShuffle(false)}
                    icon={PiShuffleBold}
                  />
                  :
                  <IconButton
                    key="shuffle-off"
                    styles="icon_button--off"
                    action={() => setShuffle(true)}
                    icon={PiShuffleBold}
                  />
                }
              </AnimatePresence>
              <div className='media--volume'>
                <AnimatePresence mode="wait">
                  {
                    mediaControls.volume === 0 ?
                    <IconButton icon={PiSpeakerSlashFill} key="muted" action={() => mediaControls.toggleVolume()}/> :
                    mediaControls.volume > 30 ?
                    <IconButton icon={PiSpeakerLowFill} key="low" action={() => mediaControls.toggleVolume()}/> :
                    mediaControls.volume >= 30 && mediaControls.vloume < 60 ?
                    <IconButton icon={PiSpeakerNoneFill} key="mid" action={() => mediaControls.toggleVolume()}/> :
                    <IconButton icon={PiSpeakerHighFill} key="high" action={() => mediaControls.toggleVolume()}/>
                  }
                </AnimatePresence>
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
