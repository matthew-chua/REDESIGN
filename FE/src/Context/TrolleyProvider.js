import React, { useEffect, useState, useContext } from "react";

export const TrolleyContext = React.createContext();

export const TrolleyProvider = ({ children }) => {
    const [value, setValue] = useState(0)
    
    return (
        <TrolleyContext.Provider value={{value, setValue}}>
            {children}
        </TrolleyContext.Provider>
    )
}