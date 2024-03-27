import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import {songsDemoData} from  '../Constants/songsDemo';

const MediaContext = createContext(null);

export const useMediaContext = () => useContext(MediaContext)



function MediaProvider({children}) {
    const allSongs = songsDemoData;
    const mediaRef = useRef(null);
    const sourceRef = useRef(null);
    const progressRef = useRef(null);
    const playAnimationRef = useRef(null);

    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ songQueue, setSongQueue ] = useState([]);
    const [ currentTrackIndex, setCurrentTrackIndex ] = useState(0);
    const [ currentSong, setCurrentSong ] = useState(songQueue[currentTrackIndex]);

    const [ isShuffled, setIsShuffled ] = useState(false);
    const queueRef = useRef([]);

    const [ mediaContext, setMediaContext ] = useState(null);
    const [ volume, setVolume ] = useState(60);
    const [ isMuted, setIsMuted ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ onLoop, setOnLoop ] = useState(false);


    const progressCallBack = useCallback(() => {
        const currentTime = mediaRef.current?.currentTime;
        setProgress(currentTime);
        if (progressRef.current) {
            progressRef.current.value = currentTime;
            progressRef.current.style.setProperty(
                '--range-progress',
                `${(progressRef.current.value / duration) * 100}%`
                );
        }
        playAnimationRef.current = requestAnimationFrame(progressCallBack);
    }, [mediaRef, duration, progressRef, setProgress])

    const toggleShuffle = () => {
        if (songQueue.length === 0) return
        if (isShuffled) {
            queueRef.current = [...songQueue];
            const currSong = songQueue[currentTrackIndex];
            const restSongs = songQueue.filter((_, index) => index !== currentTrackIndex);
            const shuffledSongs = restSongs.sort(() => Math.random() - 0.5);
            const newQueue = [currSong, ...shuffledSongs];
            setSongQueue(newQueue);
            setCurrentTrackIndex(0);
        } else {
            setSongQueue(queueRef.current);
            const currSongId = queueRef.current[currentTrackIndex].id;
            const indexRef = queueRef.current.findIndex(song => song.id === currSongId);
            setCurrentTrackIndex(indexRef);
        }
        setIsShuffled(!isShuffled);
    };

    const handleNextTrack = () => {
        if (currentTrackIndex < songQueue.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0);
        }
    };

    const clearQueue = () => {
        setSongQueue([]);
        pause();
        mediaRef.current.currentTime = 0;
    }

    const handlePrevTrack = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
        } else {
            setCurrentTrackIndex(songQueue.length - 1);
        }
    };

    const togglePlay = () => {
        if (mediaContext.state === 'suspended') {
            mediaContext.resume()
        }
        if (mediaRef.current.paused) {
            play()
        } else {
            pause()
        }
    }

    const playNow = (selectedSong) => {
        if (currentSong.id === selectedSong.id) return
        setSongQueue((prevQueue) => {
            const currentIndex = prevQueue.findIndex(song => song.id === selectedSong.id);
            let newQueue = [...prevQueue];
            if (currentIndex !== -1) {
              newQueue.splice(currentIndex, 1);
            }
            newQueue.splice(currentTrackIndex + 1, 0, selectedSong);
            return newQueue;
          });
          setCurrentTrackIndex(currentTrackIndex + 1);
    }

    const playNext = (selectedSong) => {
        setSongQueue((prevQueue) => {
            let workingQueue = isShuffled ? queueRef.current : [...prevQueue]
            let nextIndex = currentTrackIndex + 1;
            const exisitingIndex = workingQueue.findIndex(song => song.id === selectedSong.id);
            if (exisitingIndex !== -1) {
                workingQueue.splice(exisitingIndex, 1);
                if (exisitingIndex < nextIndex) nextIndex--
            }
            workingQueue.splice(nextIndex, 0, selectedSong);
            if (isShuffled) {
                queueRef.current = [...workingQueue];
                let shuffledQueue = [
                    workingQueue[currentTrackIndex],
                    ...workingQueue.slice(0, currentTrackIndex),
                    ...workingQueue.slice(currentTrackIndex + 1).sort(() => 0.5 - Math.random())
                ];
                return shuffledQueue
            }
            return workingQueue;
        })
    }

    const playAll = (songs) => {
        if (songs) setSongQueue(songs);
        else setSongQueue(allSongs);
        setCurrentTrackIndex(0)
        // play();
    }

    const play = () => {
        setIsPlaying(true)
        mediaRef.current.play();
    }

    const pause = () => {
        setIsPlaying(false)
        mediaRef.current.pause();
    }

    const onLoadedMetadata = () => {
        if (mediaRef.current) {
            const seconds = mediaRef.current.duration;
            setDuration(seconds);
            // progressRef.current.max = seconds;
        }
    }

    const onEnded = () => {
        if (onLoop) {
          mediaRef.current.currentTime = 0;
          play()
        } else {
            handleNextTrack()
        }
    };

    const handleVolume = (e) => {
        setVolume(e.target.value)
    };

    const handleProgress = (e) => {
        setProgress(e.target.value)
    };

    const toggleLoop = () => {
        setOnLoop(!onLoop)
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const mediaControls = {
        togglePlay: () => togglePlay(),
        playNow: (x) => playNow(x),
        playAll: (x) => playAll(x),
        playNext: (x) => playNext(x),
        toggleMute: () => toggleMute(),
        toggleLoop: () => toggleLoop(),
        toggleShuffle: () => toggleShuffle(),
        handleProgress: () => handleProgress(),
        handleVolume: (x) => handleVolume(x),
        nextTrack: () => handleNextTrack(),
        prevTrack: () => handlePrevTrack(),
        clearQueue: () => clearQueue()
    }

    const mediaData = {
        isPlaying,
        isMuted,
        onLoop,
        isShuffled,
        volume,
        song: currentSong,
        queue: songQueue,
        index: currentTrackIndex,
        onLoadedMetadata,
        onEnded,
        duration,
        progress,
        sourceRef,
        mediaRef,
        progressRef
    }

    useEffect(() => {
        if (mediaRef.current) {
            mediaRef.current.volume = volume / 100;
            mediaRef.current.muted = isMuted;
        }
    }, [volume, mediaRef, isMuted])

    useEffect(() => {
        const context = new (window.AudioContext)();
        setMediaContext(context);
        return () => context.close();
    }, []);

    useEffect(() => {

            setCurrentSong(songQueue[currentTrackIndex])
            if (mediaRef.current) {
                mediaRef.current.load();
                // setIsPlaying(true)
                // mediaRef.current.play();
            }

    }, [songQueue, currentTrackIndex])

    useEffect(() => {
        if (isPlaying) {
            mediaRef.current.play();
        } else {
            mediaRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(progressCallBack);
    }, [isPlaying, mediaRef])


    return (
        <MediaContext.Provider value={{mediaControls, mediaData, mediaContext}}>
            {children}
        </MediaContext.Provider>
    )
}

export default MediaProvider;
