import React, { useEffect, useState, useRef } from 'react';
import placeholder from '../../assets/placeholder_artist.svg'
import { AnimatePresence, motion } from 'framer-motion';
import {
  PiSpeakerSimpleNoneFill, PiSpeakerSimpleHighFill, PiSpeakerSimpleLowFill,
  PiSpeakerSimpleSlashFill, PiArrowsInFill, PiArrowsOutFill,
  PiPlayFill, PiRepeatBold, PiRepeatOnceBold, PiShuffleBold ,
  PiPauseBold, PiSkipForwardFill, PiSkipBackFill, PiPauseFill
} from 'react-icons/pi'
import { useMediaContext } from '../../Context/MediaContext';
import IconButton from '../Shared/Buttons/IconButton';
import Media from '../Media';
import './styles.scss';
import VolumeInput from '../Shared/Inputs/VolumeInput';

function MediaControls() {
  const { mediaControls } = useMediaContext();
  const {
    playing,
    togglePlay,
    volume,
    repeat,
    toggleRepeat,
    prevTrack,
    nextTrack,
    shuffle,
    toggleShuffle,
    mute,
    toggleMute,
    handleVolume
   } = mediaControls;

  return (
    <>
      <Media />
      <div className='media--wrapper'>
        <div className='media--container'>
            <div className='media--controls'>
              <AnimatePresence mode="wait">
                  <IconButton
                    key={`repeat-${repeat}`}
                    styles={`icon_button--no_shadow ${repeat && 'accent'}`}
                    action={toggleRepeat}
                    icon={repeat ? PiRepeatOnceBold : PiRepeatBold}
                  />
              </AnimatePresence>
              <IconButton
                styles="icon_button--no_shadow"
                action={prevTrack}
                icon={PiSkipBackFill}
              />
              <AnimatePresence mode="wait">
                  <IconButton
                    key={`play-${playing}`}
                    action={togglePlay}
                    styles='media--play'
                    icon={playing ? PiPauseFill : PiPlayFill}
                  />
              </AnimatePresence>
              <IconButton
                styles="icon_button--no_shadow"
                action={nextTrack}
                icon={PiSkipForwardFill}
              />
              <AnimatePresence mode="wait">
                  <IconButton
                    key={`shuffle-${shuffle}`}
                    styles={`icon_button--no_shadow ${shuffle && 'icon_button--off'}`}
                    action={toggleShuffle}
                    icon={PiShuffleBold}
                  />
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
                    action={toggleMute}
                  />
                <VolumeInput
                  value={volume}
                  setValue={handleVolume}
                />
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MediaControls
