import { useState, createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import NowPlayingModal from '../components/nowPlaying/nowPlayingModal';

const NowPlayingContext = createContext();

export const useNowPlaying = () => useContext(NowPlayingContext);


function NowPlayingProvider({children}) {
    const [playerState, setPlayerState] = useState("pause");
    const [full, setFull] = useState(false)

    return (
        <NowPlayingContext.Provider value={{playerState, setPlayerState, setFull}}>
            {full && <NowPlayingModal setPlayerState={setPlayerState} playerState={playerState} setFull={setFull}/>}
            {children}
        </NowPlayingContext.Provider>
    )

}

export default NowPlayingProvider
