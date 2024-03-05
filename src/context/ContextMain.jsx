import { createContext, useState, useEffect, useContext } from 'react';

// Personal List
import listPersonal from '../utils/ListPersonal';

const Context = createContext();

const ContextMain = ({ children }) => {

    const [personals, setPersonals] = useState(listPersonal);

    const contextData = {
        personals,
        setPersonals
    }

    useEffect(() => {
        localStorage.getItem("personals")===null && localStorage.setItem("personals", JSON.stringify(listPersonal));
    },[])

    useEffect(() => {
        localStorage.setItem("personals", JSON.stringify(personals));
    },[personals])
    
    return (
        <Context.Provider value={contextData}>
            {children}
        </Context.Provider>
    )
}

export const useSite = () => useContext(Context)

export default ContextMain;