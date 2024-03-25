import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import song from '../assets/test.mp3'

const MediaContext = createContext(null);

export const useMediaContext = () => useContext(MediaContext)



function MediaProvider({children}) {
    const mediaRef = useRef(null);
    const sourceRef = useRef(null);
    const [ media, setMedia ] = useState(song);
    const [ mediaContext, setMediaContext ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ volume, setVolume ] = useState(.6);
    const [ mute, setMute ] = useState(false);
    const [ repeat, setRepeat ] = useState(false)

    useEffect(() => {
        const context = new (window.AudioContext)();
        setMediaContext(context);
        return () => context.close();
    }, []);

    const togglePlay = () => {
        if (mediaContext.state === 'suspended') {
            mediaContext.resume()
        }
        if (mediaRef.current.paused) {
            mediaRef.current.play();
            setIsPlaying(true)
        } else {
            mediaRef.current.pause();
            setIsPlaying(false)
        }
    }

    const handleVolume = (event) => {
        mediaRef.current.volume = event.target.value;
        setVolume(event.target.value)
    };

    const toggleMute = () => {
        const option = !mute;
        mediaRef.current.muted = option;
        setMute(option)
    }

    const toggleRepeat = () => {
        setRepeat(!repeat)
    }

    const mediaControls = {
        isPlaying,
        togglePlay: () => togglePlay(),
        volume,
        setVolume: (e) => handleVolume(e),
        mute,
        toggleMute: () => toggleMute(),
        repeat,
        toggleRepeat: () => toggleRepeat()
    }

    return (
        <MediaContext.Provider value={{mediaControls, sourceRef, mediaRef, media, mediaContext}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaProvider;
