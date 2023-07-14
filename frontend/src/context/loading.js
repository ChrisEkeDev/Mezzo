import { useState, createContext, useContext } from 'react';
import Loading from '../components/loading';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

function LoadingProvider({children}) {
    const [loading, setLoading] = useState(undefined);

    return (
        <LoadingContext.Provider value={{setLoading}}>
            {loading && <Loading message={loading.message}/>}
            {children}
        </LoadingContext.Provider>
    )

}

export default LoadingProvider
