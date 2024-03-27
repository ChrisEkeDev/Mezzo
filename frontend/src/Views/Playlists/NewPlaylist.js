import React, { useState, useCallback } from 'react'
import NewPlaylistItem from '../../components/NewPlaylistItem';
import Scroll from '../../components/Shared/Layout/Scroll';
import TextInput from '../../components/Shared/Inputs/TextInput'
import Button from '../../components/Shared/Buttons/Button';
import { ItemTypes } from '../../Constants';
import { useDrop } from 'react-dnd';
import { songsDemoData } from '../../Constants/songsDemo';
import { AnimatePresence, motion } from 'framer-motion';
import { PiListPlusLight, PiFloppyDiskFill } from 'react-icons/pi';
import { base, swell } from '../../Constants/animations';
import usePlaylistForm from '../../Hooks/usePlaylistForm';
import './styles.scss'

function NewPlaylist() {
    const { formData, handleInput, errors, onAddSongToPlaylist, onCreatePlaylist } = usePlaylistForm();
    const { name, playlist } = formData;

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.PLAYLIST_SONG,
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                onAddSongToPlaylist(item);
            }
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop()
        }),
    });

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
                            name='name'
                            styles="new_playlist--input"
                            value={name}
                            setValue={handleInput}
                            error={errors.name}
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
                                            {/* <AnimatePresence>
                                                {
                                                    isOver ?
                                                    <span><PiFloppyDiskFill/></span> :
                                                    <span><PiFloppyDiskFill/></span>
                                                }
                                            </AnimatePresence> */}
                                            <PiListPlusLight className='new_playlist--icon'/>
                                            <span className='bold tint'>Release here to add to playlist.</span>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                                {playlist.map(song => (
                                    <NewPlaylistItem
                                        key={song.id}
                                        song={song}
                                    />
                                ))}
                            </motion.ul>
                        </Scroll>
                        <Button
                            styles="primary new_playlist--button"
                            label="Save Playlist"
                            icon={PiFloppyDiskFill}
                            action={onCreatePlaylist}
                        />
                    </div>
                    <div className='wrapper new_playlist--songs'>
                        <Scroll>
                            <motion.ul
                                className='list songs--list'
                            >
                                {songsDemoData.map(song => (
                                    <NewPlaylistItem
                                        key={song.id}
                                        song={song}
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
