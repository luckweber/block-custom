import { useContext, createContext, FunctionComponent } from "react"
import StorageManager from './StoreManager'
import React from 'react'

interface DataContextProps {
    sellers: any
    setSellers: (s: any) => void
}

export const KEY_SELLERS = 'sellersMessage:date'
export const STORE_SELLERS = new StorageManager(KEY_SELLERS)
export const inititalStore = (store: any, inititalData: any) => store.getItem() ? JSON.parse(store.getItem()) : inititalData

const sellers = inititalStore(STORE_SELLERS, [])

const initialState = {
    sellers,
    setSellers: (s: any) => s,
}

const DataContext = createContext<DataContextProps>(initialState)
const useDataContext = () => useContext(DataContext)


const DataContextProvider: FunctionComponent<any> = ({ children, value }) => (
    <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>
)

export {
    useDataContext,
    DataContextProvider,
    initialState,
}
