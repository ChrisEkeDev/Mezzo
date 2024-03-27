import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {songsDemoData} from  '../Constants/songsDemo';

const MediaContext = createContext(null);

export const useMediaContext = () => useContext(MediaContext)



function MediaProvider({children}) {
    const mediaRef = useRef(null);
    const sourceRef = useRef(null);
    const [ mediaPlaylist, setMediaPlaylist ] = useState(songsDemoData);
    const [ currentTrackIndex, setCurrentTrackIndex ] = useState(0);
    const [ isShuffled, setIsShuffled ] = useState(false);
    const [ originalMediaPlaylist, setOriginalMediaPlaylist ] = useState(songsDemoData);
    const [ mediaContext, setMediaContext ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ volume, setVolume ] = useState(.6);
    const [ isMute, setIsMute ] = useState(false);
    const [ isRepeat, setIsRepeat ] = useState(false);

    useEffect(() => {
        const context = new (window.AudioContext)();
        setMediaContext(context);
        return () => context.close();
    }, []);

    const toggleShuffle = () => {
        if (isShuffled) {
            setMediaPlaylist(originalMediaPlaylist);
            setIsShuffled(false);
        } else {
            let shuffledPlaylist = [...mediaPlaylist];
            for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
            }
            setMediaPlaylist(shuffledPlaylist);
            setIsShuffled(true);
        }
    };

    const handleNexTrack = () => {
        if (currentTrackIndex < mediaPlaylist.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0)
        }
    };

    const handlePrevTrack = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        } else {
            setCurrentTrackIndex(mediaPlaylist.length - 1);
        }
    };

    const handleAddSongToPlaylist = (song) => {
        const updatedPlaylist = [...mediaPlaylist, song];
        setMediaPlaylist(updatedPlaylist);
        if (!isShuffled) {
            setOriginalMediaPlaylist(updatedPlaylist);
        }
    };

    const handleAddSongNext = (song) => {
        const newPlaylist = [...mediaPlaylist];
        newPlaylist.splice(currentTrackIndex + 1, 0, song);
        setMediaPlaylist(newPlaylist);

        if (!isShuffled) {
            const newOriginalMediaPlaylist = [...originalMediaPlaylist];
            newOriginalMediaPlaylist.splice(currentTrackIndex + 1, 0, song);
            setOriginalMediaPlaylist(newOriginalMediaPlaylist);
        } else {
            setOriginalMediaPlaylist([...originalMediaPlaylist, song]);
        }
    };


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
        const option = !isMute;
        mediaRef.current.muted = option;
        setIsMute(option)
    }

    const toggleRepeat = () => {
        setIsRepeat(!isRepeat)
    }

    const currentSong = mediaPlaylist[currentTrackIndex];

    const mediaControls = {
        playlist: mediaPlaylist,
        playing: isPlaying,
        togglePlay: () => togglePlay(),
        volume,
        handleVolume: (e) => handleVolume(e),
        mute: isMute,
        toggleMute: () => toggleMute(),
        repeat: isRepeat,
        toggleRepeat: () => toggleRepeat(),
        shuffle: isShuffled,
        toggleShuffle: () => toggleShuffle(),
        index: currentTrackIndex,
        nextTrack: () => handleNexTrack(),
        prevTrack: () => handlePrevTrack(),
        playSongNext: (song) => handleAddSongNext(song)
    }

    const mediaData = {
        currentSong,
        currentPlaylist: mediaPlaylist,
        currentIndex: currentTrackIndex
    }

    useEffect(() => {
        if (mediaPlaylist[currentTrackIndex]) {
            mediaRef.current.src = mediaPlaylist[currentTrackIndex].file;
            mediaRef.current.play();
            setIsPlaying(true)
        }
    }, [currentTrackIndex, mediaPlaylist])

    return (
        <MediaContext.Provider value={{mediaControls, mediaData, sourceRef, mediaRef, mediaContext}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaProvider;
