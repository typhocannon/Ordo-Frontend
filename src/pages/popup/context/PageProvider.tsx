import React, { createContext, useState } from "react"

export const PageContext = createContext({
    currentPage: "Home",
    setCurrentPage: (page: string) => {},
})

type ContextProviderProps = {
    children?: React.ReactNode
}

export const PageProvider = ({children}: ContextProviderProps) => {
    const [page, setPage] = useState("Home");
    const setCurrentPage = (page: string) => {
        setPage(page);
    }
    return (
        <PageContext.Provider value={{currentPage: page, setCurrentPage}}>
            {children}
        </PageContext.Provider>
    )
}