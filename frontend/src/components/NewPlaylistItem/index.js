import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import placeholder from '../../assets/placeholder_artist.svg';
import IconButton from '../../components/Shared/Buttons/IconButton';
import { ItemTypes } from '../../Constants';
import { useMediaContext } from '../../Context/MediaContext'
import { PiPlayFill, PiNotchesBold, PiAirTrafficControl } from 'react-icons/pi'
import { useDrag } from 'react-dnd';
import './styles.scss';
import NowPlayingAnimation from '../Shared/NowPlayingAnimation';

function NewPlaylistItem(props) {
    const { song, draggable } = props;
    const { mediaData } = useMediaContext();
    const { progress, duration, isPlaying } =  mediaData;
    const [ isHovering, setIsHovering ] = useState(false);
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.PLAYLIST_SONG,
        item: { ...song },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        })
    });

    const currentSong = song?.id === mediaData?.song?.id;
    const currentSongPlaying = currentSong && isPlaying;

    return (
        <motion.li
            ref={draggable && drag}
            style={{
                cursor: draggable && 'grab',
                backgroundColor: isDragging && 'rgba(243, 78, 119, .10)',
            }}
            className='wrapper new_playlist_item--wrapper list_item'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {
                currentSongPlaying ?
                <NowPlayingAnimation /> :
                <AnimatePresence>
                {
                    isHovering &&
                    <IconButton
                        styles='new_playlist_item--play icon_button--no_shadow accent'
                        icon={PiPlayFill}
                        action={() => alert(`Play ${song.name} by ${song.artist}`)}
                    />
                }
                </AnimatePresence>
            }

            <img className="song_item--image fg" src={placeholder}/>
            <div className='flex-col fg'>
                <span className="sm bold">{song.name}</span>
                <span className="sm tint">{song.artist}</span>
            </div>
            <AnimatePresence>
            {
                isHovering &&
                <IconButton
                    styles='new_playlist_item--options icon_button--no_shadow'
                    icon={PiNotchesBold}
                    action={() => alert(`Open Options for ${song.name}`)}
                />
            }
            </AnimatePresence>

            {
                currentSong &&
                <div
                    className="song_item--progress"
                    style={{width: `${Math.floor((progress / duration) * 100)}%`}}
                />
            }


        </motion.li>
    )
}

export default NewPlaylistItem
