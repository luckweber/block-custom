import React, { useEffect, useState } from 'react'
import {
    Table as VTable,
} from 'vtex.styleguide'
import ModalCreate from './ModalCreate';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { useDataContext } from '../utils/DataContext';

const Table = () => {

    const [show, setShow] = useState(false)
    const [values, setValues] = useState([])

    const { sellers } = useDataContext()

    useEffect(() => {
        setValues(sellers)
    }, [sellers])


    return <div className="pa4 mt4">
        <VTable
            fullWidth
            schema={jsonschema(values)}
            items={values}
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
            data={values}
        />
    </div>

}


const jsonschema = (values: any) => ({
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
                                sellers={values}
                            />
                        </div>
                        <div className="mr2">
                            <ModalDelete
                                seller={prop}
                                sellers={values}
                            />
                        </div>
                    </div>
                )
            },
        }
    }
})

export default Table