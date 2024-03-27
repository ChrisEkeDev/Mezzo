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
import VolumeInput from '../Shared/Inputs/VolumeInput';
import './styles.scss';

function MediaControls() {
  const { mediaControls, mediaData } = useMediaContext();
  const {
    togglePlay,
    toggleLoop,
    prevTrack,
    nextTrack,
    toggleShuffle,
    toggleMute,
    handleVolume
   } = mediaControls;

   const { onLoop, isPlaying, isMuted, volume, isShuffled } = mediaData;

  return (
    <>
      <Media />
      <div className='media--wrapper'>
        <div className='media--container'>
            <div className='media--controls'>
              <AnimatePresence mode="wait">
                  <IconButton
                    key={`repeat-${onLoop}`}
                    styles={`icon_button--no_shadow ${onLoop ? 'accent' : 'icon_button--off' }`}
                    action={toggleLoop}
                    icon={onLoop ? PiRepeatOnceBold : PiRepeatBold}
                  />
              </AnimatePresence>
              <IconButton
                styles="icon_button--no_shadow"
                action={prevTrack}
                icon={PiSkipBackFill}
              />
              <AnimatePresence mode="wait">
                  <IconButton
                    key={`play-${isPlaying}`}
                    action={togglePlay}
                    styles='media--play'
                    icon={isPlaying ? PiPauseFill : PiPlayFill}
                  />
              </AnimatePresence>
              <IconButton
                styles="icon_button--no_shadow"
                action={nextTrack}
                icon={PiSkipForwardFill}
              />
              <AnimatePresence mode="wait">
                  <IconButton
                    key={`shuffle-${isShuffled}`}
                    styles={`icon_button--no_shadow ${isShuffled ? 'accent' : 'icon_button--off'}`}
                    action={toggleShuffle}
                    icon={PiShuffleBold}
                  />
              </AnimatePresence>
              <div className='media--volume'>
                  <IconButton
                    styles="icon_button--no_shadow"
                    icon={
                      volume === 0 || isMuted ?
                      PiSpeakerSimpleSlashFill :
                      volume < 30 ?
                      PiSpeakerSimpleNoneFill :
                      volume >= 30 && volume < 60 ?
                      PiSpeakerSimpleLowFill :
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
