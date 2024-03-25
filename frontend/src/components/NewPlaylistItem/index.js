import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../../components/shared/Buttons/IconButton';
import { ItemTypes } from '../../constants';
import { PiPlayFill, PiNotchesBold } from 'react-icons/pi'
import { useDrag } from 'react-dnd';
import './styles.scss';

function NewPlaylistItem(props) {
    const { song, draggable } = props;
    const [ isHovering, setIsHovering ] = useState(false);
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.PLAYLIST_SONG,
        item: { song },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
          // clientOffset: monitor.getClientOffset(),
        })
    });

    return (
        <motion.li
            ref={draggable && drag}
            style={{
                cursor: draggable && 'grab',
                backgroundColor: isDragging && 'rgba(243, 78, 119, .10)',
            }}
            className='wrapper playlist_item--wrapper list_item'
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
                    action={() => alert(`Play Song ${song}`)}
                />
            }
            </AnimatePresence>
            <img className="song_item--image" src={placeholder}/>
            <div className='flex-col'>
                <span className="sm bold">Song Name {song}</span>
                <span className="sm tint">Artist Name</span>
            </div>
            <AnimatePresence>
            {
                isHovering &&
                <IconButton
                key={0}
                styles='playlist_item--options icon_button--no_shadow'
                icon={PiNotchesBold}
                action={() => alert(`Open Options ${song}`)}
                />
            }
            </AnimatePresence>
        </motion.li>
    )
}

export default NewPlaylistItem
