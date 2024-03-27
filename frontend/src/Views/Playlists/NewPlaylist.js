import React, { useState, useCallback } from 'react'
import NewPlaylistItem from '../../components/NewPlaylistItem';
import Scroll from '../../components/Shared/Layout/Scroll';
import TextInput from '../../components/Shared/Inputs/TextInput'
import Button from '../../components/Shared/Buttons/Button';
import { ItemTypes } from '../../Constants';
import { useDrop, useDrag } from 'react-dnd';
import './styles.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { PiListPlusLight, PiFloppyDiskFill } from 'react-icons/pi';
import { base, swell } from '../../Constants/animations';

function NewPlaylist() {
    const [ playlistName, setPlaylistName ] = useState('')
    const [ playlistSongs, setPlaylistSongs ] = useState([{song: 21}, {song: 22}, { song: 23}]);
    const allSongs = Array.from({ length: 20 }, (_, index) => index + 1);

    const handleAddToPlaylist = (song) => {
        if (playlistSongs.find(foundSong => foundSong.song === song.song)) return
        setPlaylistSongs(playlist => [...playlist, song]);
    }

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.PLAYLIST_SONG,
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                handleAddToPlaylist(item);
            }
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop()
        }),
    });

    const handleInput = (value) => {
        setPlaylistName(value)
    }



    return (
        <div className="wrapper">
                <header className='header'>
                    <span className='label'>
                        Create a New Playlist
                    </span>
                </header>
                <section className='wrapper new_playlist--wrapper'>
                    <div className='wrapper new_playlist--form'>
                        <TextInput
                            name='playlist'
                            styles="new_playlist--input"
                            value={playlistName}
                            setValue={handleInput}
                            error={playlistName.length === 0 ? 'Please enter a name' : null}
                        />
                        <Scroll styles='new_playlist--scroll'>
                            <motion.ul
                                ref={drop}
                                className='wrapper list songs--list new_playlist--list'
                            >
                                <AnimatePresence>
                                    {
                                        canDrop &&
                                        <motion.div
                                            {...base}
                                            variants={swell}
                                            className='new_playlist--overlay'
                                        >
                                            <PiListPlusLight className='new_playlist--icon'/>
                                            <span className='bold tint'>Release here to add to playlist.</span>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                                {playlistSongs.map(song => (
                                    <NewPlaylistItem
                                        key={song.song}
                                        song={song.song}
                                    />
                                ))}
                            </motion.ul>
                        </Scroll>
                        <Button
                            styles="primary new_playlist--button"
                            label="Save Playlist"
                            left={PiFloppyDiskFill}
                        />
                    </div>
                    <div className='wrapper new_playlist--songs'>
                        <Scroll>
                            <motion.ul
                                className='list songs--list'
                            >
                                {allSongs.map(song => (
                                    <NewPlaylistItem
                                        key={song}
                                        song={song}
                                        handleAddToPlaylist={handleAddToPlaylist}
                                        draggable
                                    />
                                ))}
                            </motion.ul>
                        </Scroll>
                    </div>
                </section>
            </div>
    )
}

export default NewPlaylist
