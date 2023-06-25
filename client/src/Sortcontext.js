import React,{ createContext, useEffect, useState } from "react";

export const SortContext = createContext();

export const SortContextProvider = ({children}) =>{
    // const [enableSort,setEnableSort] = useState(JSON.parse(localStorage.getItem("enableSort")) || false);
    const [enableSort,setEnableSort] = useState(
        JSON.parse(localStorage.getItem("enableSort")) || false);


    const enableSorting = () =>{
        setEnableSort(!enableSort);
    }

    useEffect(() => {
        localStorage.setItem("enableSort",enableSort);
    },[enableSort]);

    return (
        <SortContext.Provider value={{enableSort, enableSorting}}>
            {children}
        </SortContext.Provider>
    )
}
