import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IconButton from '../../components/shared/Buttons/IconButton';
import placeholder from '../../assets/placeholder_artist.svg';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';


function PlaylistItem({playlist}) {
    const [ isHovering, setIsHovering ] = useState(false);

    return (
        <li
            className='playlist_item--wrapper list_item'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <AnimatePresence>
                {
                isHovering &&
                <IconButton
                    key={0}
                    styles='playlist_item--play icon_button--no_shadow accent'
                    icon={PiPlayFill}
                    action={() => alert(`Play Playlist ${playlist}`)}
                />
                }
            </AnimatePresence>

            <img className='playlist_item--image' src={placeholder}/>
            <span className='playlist_item--artist'>Playlist {playlist}</span>

            <AnimatePresence>
                {
                isHovering &&
                <IconButton
                    key={0}
                    styles='playlist_item--options icon_button--no_shadow'
                    icon={PiNotchesBold}
                    action={() => alert(`Open Options ${playlist}`)}
                />
                }
            </AnimatePresence>
        </li>
    )
}

export default PlaylistItem
