import { useState, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Loading from '../components/loading';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const [loading, setLoading] = useState(undefined);
    const history = useHistory();
    const navigate = (route) => {
        history.push(route)
    }

    return (
        <AppContext.Provider value={{navigate, setLoading}}>
            {loading && <Loading message={loading.message}/>}
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider
