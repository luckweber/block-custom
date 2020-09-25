import React from 'react'
import { DataContextProvider, initialState, STORE_SELLERS } from './utils/DataContext';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo'
import getVBase from './graphql/queries/getVBase.gql'

const Wrapper = ({ children }: any) => {

    const variables = { bucket: 'sellers', path: 'sellers.json' }
    const { loading, data, error } = useQuery(getVBase, { variables, fetchPolicy: "network-only" });
    const [sellers, setSellers] = useState(initialState.sellers)


    useEffect(() => {

        handleSellers()

    }, [loading])


    const handleSellers = () => {
        if (!loading && !error) {
            const getSellers = data?.getVBase ? JSON.parse(data?.getVBase) : null
            setSellers(getSellers)
            STORE_SELLERS.setItem(getSellers)
        }
    }

    return <DataContextProvider
        value={{
            sellers,
            setSellers
        }}
    >
        {children}
    </DataContextProvider>
}

export default Wrapper

