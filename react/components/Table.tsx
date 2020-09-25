import React, { FunctionComponent, useState } from 'react'
import {
    Table as VTable,
} from 'vtex.styleguide'
import ModalCreate from './ModalCreate';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

interface CustomProps {
    clients: any
    loading: boolean
}

const Table: FunctionComponent<CustomProps> = ({ clients, loading }) => {

    const [show, setShow] = useState(false)

    return <div className="pa4 mt4">
        <VTable
            fullWidth
            loading={loading}
            schema={jsonschema(clients)}
            items={clients}
            toolbar={{
                newLine: {
                    label: 'Novo Cliente',
                    handleCallback: () => setShow(true)
                }
            }}
        />
        <ModalCreate
            show={show}
            setShow={setShow}
            data={clients}
        />
    </div>

}


const jsonschema = (clients: any) => ({
    properties: {
        name: {
            title: 'Nome',
        },
        cellPhone: {
            title: 'Telefone',
            width: 300,
        },
        action: {
            title: 'Ação',
            minWidth: 100,
            cellRenderer: (prop: any) => {
                return (
                    <div className="flex justify-center">
                        <div className="mr2">
                            <ModalEdit
                                seller={prop}
                                sellers={clients}
                            />
                        </div>
                        <div className="mr2">
                            <ModalDelete
                                seller={prop}
                                sellers={clients}
                            />
                        </div>
                    </div>
                )
            },
        }
    }
})

export default Table