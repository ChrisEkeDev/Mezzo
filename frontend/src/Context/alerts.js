import { useState, createContext, useContext } from 'react';
import Alerts from '../components/alerts';
import uuid from 'react-uuid';

const AlertsContext = createContext();

export const useAlerts = () =>  useContext(AlertsContext);

function AlertsProvider({children}) {
    const [alerts, setAlerts] = useState([]);

    const handleAlerts = (alert) => {
        const newAlert = { id: uuid(), ...alert };
        setAlerts([ ...alerts, newAlert ]);
    }

    const removeAlerts = (selectedAlert) => {
        setAlerts(alerts => alerts.filter(alert => alert.id !== selectedAlert.id))
    }

    return (
        <AlertsContext.Provider value={{handleAlerts}}>
            {alerts.length > 0 ? <Alerts removeAlerts={removeAlerts} alerts={alerts}/> : null}
            {children}
        </AlertsContext.Provider>
    )
}

export default AlertsProvider
