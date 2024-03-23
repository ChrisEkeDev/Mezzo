import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../../components/shared/Buttons/IconButton';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import './styles.scss';

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
                    key={0}
                    styles='list_item--play icon_button--no_shadow'
                    icon={PiPlayFill}
                    action={() => alert(`Play Song ${artist}`)}
                />
                }
            </AnimatePresence>

            <img className='artist_list_item--image' src={placeholder}/>
            <span className='md bold'>Artist List Item {artist}</span>

            <AnimatePresence>
                {
                isHovering &&
                <IconButton
                    key={0}
                    styles='list_item--options icon_button--no_shadow'
                    icon={PiNotchesBold}
                    action={() => alert(`Open Options ${artist}`)}
                />
                }
            </AnimatePresence>


        </li>
    )
}

export default ArtistListItem
