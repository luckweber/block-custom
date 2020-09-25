import React, { FC, useEffect, useState } from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'
import Table from '../../components/Table'
import { useIntl } from 'react-intl'
import getVBase from './../../graphql/queries/getVBase.gql'
import { useQuery } from 'react-apollo'

const AdminExample: FC = () => {

    const intl = useIntl()

    const variables = { bucket: 'sellers', path: 'sellers.json' }
    const { loading, data, error } = useQuery(getVBase, { variables, fetchPolicy: "network-only" });
    const [clients, setClients] = useState([])

    useEffect(() => {
        if (!loading && !error) {
            const dt = JSON.parse(data.getVBase) || []
            setClients(dt)
        }
    }, [loading])



    return (
        <Layout>
            <PageBlock
                title={intl.formatMessage({ id: "admin-example.navigation.label" })}
                subtitle={intl.formatMessage({ id: "admin-example.navigation.list" })}
                variation="full"
            >
                <Table
                    clients={clients}
                    loading={loading}
                />
            </PageBlock>
        </Layout>
    )
}

export default AdminExample