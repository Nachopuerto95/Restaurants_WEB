

import React, { createContext, useContext, useState } from 'react';


const LocationContext = createContext();


export function LocationProvider({ children }) {
    const [initialAddress, setInitialAddress] = useState(null); // Estado para almacenar la dirección inicial

    return (
        <LocationContext.Provider value={{ initialAddress, setInitialAddress }}>
            {children}
        </LocationContext.Provider>
    );
}


export function useLocation() {
    return useContext(LocationContext);
}
