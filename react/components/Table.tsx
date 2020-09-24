import React from 'react'
import {
    Table as VTable,
    ButtonWithIcon,
    IconDelete,
    IconEdit
} from 'vtex.styleguide'
import clientsData from '../data/sellers'

const Table = () => {
    const { clients } = clientsData


    return <div className="pa4 mt4">
        <VTable
            fullWidth
            schema={jsonschema}
            items={clients}
        />
    </div>

}


const jsonschema = {
    properties: {
        name: {
            title: 'Nome',
        },
        cellphone: {
            title: 'Telefone',
            width: 300,
        },
        action: {
            title: 'Ação',
            minWidth: 100,
            cellRenderer: () => {
                return (
                    <div className="flex justify-center">
                        <div className="mr2">
                            <ButtonWithIcon icon={<IconEdit />} variation="Primary">
                                Editar
                            </ButtonWithIcon>
                        </div>
                        <div className="mr2">
                            <ButtonWithIcon icon={<IconDelete />} variation="danger">
                                Deletar
                            </ButtonWithIcon>
                        </div>
                    </div>
                )
            },
        }
    }
}

export default Table