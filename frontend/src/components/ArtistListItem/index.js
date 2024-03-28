import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../Shared/Buttons/IconButton';
import { PiShuffleBold, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';

const ROUTE_PREFIX = '/dashboard/artists/'

function ArtistListItem({artist}) {
    const [ isHovering, setIsHovering ] = useState(false);
    return (
        <li
            className='artist_list_item--wrapper list_item'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <AnimatePresence>
                {
                    isHovering &&
                    <IconButton
                        styles='list_item--play icon_button--no_shadow accent'
                        icon={PiShuffleBold}
                        action={() => alert(`Shuffle Artist ${artist} Songs`)}
                    />
                }
            </AnimatePresence>

            <img className='artist_list_item--image' src={placeholder}/>
            <Link
                className='artist_item--artist bold accent'
                to={`${ROUTE_PREFIX}${artist}`}>
                Artist {artist}
            </Link>

            <AnimatePresence>
                {
                    isHovering &&
                    <IconButton
                        styles='list_item--options icon_button--no_shadow'
                        icon={PiNotchesBold}
                        action={() => alert(`Open Options for Artist ${artist}`)}
                    />
                }
            </AnimatePresence>


        </li>
    )
}

export default ArtistListItem