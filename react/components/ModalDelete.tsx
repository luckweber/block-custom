import React, { FunctionComponent, useEffect, useState } from 'react'
import {
    ModalDialog,
    IconDelete,
    ButtonWithIcon
} from 'vtex.styleguide'
import saveGACodeMutation from './../graphql/mutations/saveVBase.gql'
import { useApolloClient } from 'react-apollo'
import { STORE_SELLERS, useDataContext } from '../utils/DataContext'

interface CustomProps {
    seller: any
    sellers: any
}

const ModalDelete: FunctionComponent<CustomProps> = ({ seller }) => {

    const [show, setShow] = useState(false)
    const [cellPhone, setCellPhone] = useState('')
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const client = useApolloClient();
    const variables = { bucket: 'sellers', path: 'sellers.json' }

    const { setSellers, sellers } = useDataContext()


    useEffect(() => {
        const { rowData } = seller
        setName(rowData.name)
        setCellPhone(rowData.cellPhone)
        setID(rowData.id)
    }, [seller])


    const handleSave = () => {

        if (cellPhone.length >= 8 && name.length >= 3) {

            const newSeller: any = sellers.filter(({ id: i }: any) => i !== id)
            if (!newSeller) return


            try {
                client.mutate({
                    mutation: saveGACodeMutation,
                    variables: {
                        ...variables,
                        data: JSON.stringify(newSeller),
                    },
                }).then(() => {
                    setSellers(newSeller)
                    STORE_SELLERS.setItem(newSeller)
                    setShow(false)
                })

            } catch (error) {
                console.log(error);

            }
        }
    }

    return (
        <div>

            <ButtonWithIcon
                icon={<IconDelete />}
                variation="danger"
                onClick={() => setShow(true)}
            >
                Deletar
            </ButtonWithIcon>

            <ModalDialog
                centered
                confirmation={{
                    onClick: () => handleSave(),
                    label: 'Deletar',
                }}
                cancelation={{
                    onClick: () => setShow(false),
                    label: 'Cancelar',
                }}
                isOpen={show}
                onClose={() => setShow(false)}>
                <div className="flex flex-column flex-row-ns">
                    <div className="w-100 mv4 pv6-ns pl6-ns">
                        <p className="w-100 mv6 ttu">Desejar Mesmo deletar esse vendedor?</p>
                    </div>
                </div>
            </ModalDialog>
        </div>
    )
}


export default ModalDelete