import { useState, createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const NowPlayingContext = createContext();

export const useNowPlaying = () => useContext(NowPlayingContext);


function NowPlayingProvider({children}) {
    const [playerState, setPlayerState] = useState("pause");

    return (
        <NowPlayingContext.Provider value={{playerState, setPlayerState}}>
            {children}
        </NowPlayingContext.Provider>
    )

}

export default NowPlayingProvider
