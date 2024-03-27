import React, { useState } from 'react';
import { useApp } from '../../Context/AppContext';
import Button from '../../components/Shared/Buttons/Button';
import * as ROUTES from '../../Constants/routes'
import { PiMusicNotesFill, PiMicrophoneStageFill, PiMusicNotesThin, PiMicrophoneStageThin  } from 'react-icons/pi';
import { AnimatePresence, motion } from 'framer-motion';
import './styles.scss';
import { base, icon } from '../../Constants/animations';

function CreateNew() {
    const { navigate } = useApp();
    const [ isHovering, setIsHovering ] = useState(null)

    return (
        <div className='wrapper'>
        <header className='header'>
            <span className='label'>Create your new{isHovering ? ` ${isHovering}.` : '...'}</span>
        </header>
        <section className="create_new--section">
            <div
                onMouseEnter={() => setIsHovering("artist")}
                onMouseLeave={() => setIsHovering(null)}
                className="create_new--option">
                <span className="create_new--icon--wrapper">
                    <AnimatePresence>
                        {
                            isHovering === 'artist' ?
                            <motion.span
                                {...base}
                                variants={icon}
                                key="artist-on"
                                className="create_new--icon"
                            >
                                <PiMicrophoneStageFill />
                            </motion.span> :
                            <motion.span
                                {...base}
                                variants={icon}
                                key="artist-off"
                                className="create_new--icon"
                            >
                                <PiMicrophoneStageThin />
                            </motion.span>
                        }
                    </AnimatePresence>
                </span>
                <p className='create_new--body'>
                    This is your first step towards building your
                    personalized music universe. Add a profile picture
                    to give your artist a face and make their profile
                    even more captivating. Start now and let the world
                    discover the music that resonates with you.
                    Start now and let the world discover the music
                    that resonates with you.
                </p>
                <Button
                    label="Create an Artist"
                    styles="primary create_new--button"
                    action={() => navigate(ROUTES.NEW_ARTIST)}
                />
            </div>
            <div
                onMouseEnter={() => setIsHovering("song")}
                onMouseLeave={() => setIsHovering(null)}
                className="create_new--option">
                <span className="create_new--icon--wrapper">
                    <AnimatePresence>
                        {
                            isHovering === 'song' ?
                            <motion.span
                                {...base}
                                variants={icon}
                                key="song-on"
                                className="create_new--icon"
                            >
                                <PiMusicNotesFill />
                            </motion.span> :
                            <motion.span
                                {...base}
                                variants={icon}
                                key="song-off"
                                className="create_new--icon"
                            >
                                <PiMusicNotesThin />
                            </motion.span>
                        }
                    </AnimatePresence>
                </span>
                <p className='create_new--body'>
                    This is your space to add new songs and expand your
                    musical horizons. Provide the song title, attach
                    it to an artist, and don’t forget to specify the
                    genre to help categorize your music collection
                    better.  Share your favorite tunes and create the
                    ultimate playlist that defines you. Dive in and
                    let the rhythm set you free!
                </p>
                <Button
                    label="Create an Song"
                    styles="primary create_new--button"
                    action={() => navigate(ROUTES.NEW_SONG)}
                />
            </div>
        </section>
    </div>
    )
}

export default CreateNew
