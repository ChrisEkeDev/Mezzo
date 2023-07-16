import { useState, createContext, useContext } from 'react';
import NowPlayingModal from '../components/nowPlaying/nowPlayingModal';

const NowPlayingContext = createContext();

export const useNowPlaying = () => useContext(NowPlayingContext);

function NowPlayingProvider({children}) {
    const [playerState, setPlayerState] = useState("stop");
    const [full, setFull] = useState(false)

    // const handlePlay = (state) => {
    //     setState(state)
    // }

    return (
        <NowPlayingContext.Provider value={{playerState, setPlayerState, setFull}}>
            {full && <NowPlayingModal setPlayerState={setPlayerState} playerState={playerState} setFull={setFull}/>}
            {children}
        </NowPlayingContext.Provider>
    )

}

export default NowPlayingProvider
