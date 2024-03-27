import { useState, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

function AppProvider({children}) {
    const [loading, setLoading] = useState(null);
    const { push } = useHistory();
    // const navigate = (route) => {
    //     history.push(route)
    // }

    return (
        <AppContext.Provider value={{navigate: push, setLoading}}>
            {loading && <Loading message={loading.message}/>}
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider
