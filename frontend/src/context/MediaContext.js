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
    const [ volume, setVolume] = useState(60);

    // const initiateMedia = () => {
    //     if (mediaContext.state === 'suspended') {
    //         mediaContext.resume()
    //     }
    // }

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

    const toggleVolume = () => {
        if (volume < 30) {
            setVolume(60)
        } else if (volume >= 30 && volume < 60) {
            setVolume(100)
        } else if (volume === 0) {
            setVolume(30)
        } else {
            setVolume(0)
        }
    }

    const handleVolume = (event) => {
        mediaRef.current.volume = event.target.value;
        setVolume(event.target.value)
    };

    const mediaControls = {
        isPlaying,
        togglePlay: () => togglePlay(),
        volume,
        setVolume: (e) => handleVolume(e),
        toggleVolume: () => toggleVolume()
    }

    return (
        <MediaContext.Provider value={{mediaControls, sourceRef, mediaRef, media, mediaContext}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaProvider;
