import React, { FC } from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'
import Table from '../../components/Table'
import { useIntl } from 'react-intl'

const AdminExample: FC = () => {

    const intl = useIntl()
    return (
        <Layout>
            <PageBlock
                title={intl.formatMessage({ id: "admin-example.navigation.label" })}
                subtitle={intl.formatMessage({ id: "admin-example.navigation.list" })}
                variation="full"
            >
                <Table />
            </PageBlock>
        </Layout>
    )
}

export default AdminExample