import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IconButton from '../../components/Shared/Buttons/IconButton';
import placeholder from '../../assets/placeholder_artist.svg';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';

const ROUTE_PREFIX = '/dashboard/playlists/'


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
                    styles='playlist_item--play icon_button--no_shadow accent'
                    icon={PiPlayFill}
                    action={() => alert(`Play Playlist ${playlist}`)}
                />
                }
            </AnimatePresence>

            <img className='playlist_item--image' src={placeholder}/>

            <Link
                className='artist_item--artist bold accent'
                to={`${ROUTE_PREFIX}${playlist}`}>
                Playlist {playlist}
            </Link>

            <AnimatePresence>
                {
                isHovering &&
                <IconButton
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
