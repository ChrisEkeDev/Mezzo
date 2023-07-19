import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { thunkClearNowPlaying } from '../store/songs';
import { useDispatch, useSelector } from 'react-redux';
const NowPlayingContext = createContext();

export const useNowPlaying = () => useContext(NowPlayingContext);


function NowPlayingProvider({children}) {
    const [playerState, setPlayerState] = useState("paused");
    const nowPlayingData = useSelector(state => state.songs.nowPlaying)
    const tracks = Object.values(nowPlayingData)
    const [ fullScreen, setFullScreen ] = useState(false);
    const [ trackIndex, setTrackIndex ] = useState(0);
    const [ currentTrack, setCurrentTrack ] = useState(tracks[trackIndex]);
    const [ progress, setProgress ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ loop, setLoop ] = useState(false)
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const dispatch = useDispatch();

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
            handleClear();
            } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
            handlePlay()
        }
    };

    const handleClear = () => {
        dispatch(thunkClearNowPlaying())
        handlePause();
        audioRef.current.currentTime = 0;
    }

    const handlePlay = () => {
        setPlayerState("playing")
        audioRef.current.play();
    }

    const handlePause = () => {
        setPlayerState("paused")
        audioRef.current.pause();
    }

    const onLoadedMetadata = () => {
        const seconds = audioRef.current?.duration;
        setDuration(seconds);
        progressRef.current.max = seconds;
    }

    useEffect(() => {
        if (currentTrack) {
            handlePlay()
        }
    }, [currentTrack])


    return (
        <NowPlayingContext.Provider
            value={{
                playerState, setPlayerState,
                fullScreen, setFullScreen,
                trackIndex, setTrackIndex,
                currentTrack, setCurrentTrack,
                progress, setProgress,
                duration, setDuration,
                loop, setLoop,
                audioRef,
                progressRef,
                tracks,
                handlePlay, handlePause, handleClear
            }}>
            <audio ref={audioRef} src={currentTrack?.song} onLoadedMetadata={onLoadedMetadata} onEnded={handleNext} loop={loop}></audio>
            {children}
        </NowPlayingContext.Provider>
    )

}

export default NowPlayingProvider
