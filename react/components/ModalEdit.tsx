import React, { FunctionComponent, useEffect, useState } from 'react'
import {
    ModalDialog,
    Input,
    IconEdit,
    ButtonWithIcon
} from 'vtex.styleguide'
import saveGACodeMutation from './../graphql/mutations/saveVBase.gql'
import { useApolloClient } from 'react-apollo'

interface CustomProps {
    seller: any
    sellers: any
}

const ModalEdit: FunctionComponent<CustomProps> = ({ seller, sellers }) => {

    const [show, setShow] = useState(false)
    const [cellPhone, setCellPhone] = useState('')
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const client = useApolloClient();
    const variables = { bucket: 'sellers', path: 'sellers.json' }


    useEffect(() => {
        const { rowData } = seller
        setName(rowData.name)
        setCellPhone(rowData.cellPhone)
        setID(rowData.id)
    }, [seller])


    const handleSave = () => {

        if (cellPhone.length >= 8 && name.length >= 3) {

            const newSeller: any = sellers.find(({ id: i }: any) => i == id)
            const objIndex = sellers.findIndex(({ id: i }: any) => i == id)

            if (!newSeller) return

            console.log(newSeller);

            sellers[objIndex] = {
                ...newSeller,
                cellPhone,
                name
            }



            try {
                client.mutate({
                    mutation: saveGACodeMutation,
                    variables: {
                        ...variables,
                        data: JSON.stringify(sellers),
                    },
                }).then(() => {
                    setShow(false)
                    console.log(client);

                })

            } catch (error) {
                console.log(error);

            }
        }
    }



    return (
        <div>

            <ButtonWithIcon
                icon={<IconEdit />}
                variation="primary"
                onClick={() => setShow(true)}
            >
                Editar
            </ButtonWithIcon>

            <ModalDialog
                centered
                confirmation={{
                    onClick: () => handleSave(),
                    label: 'Criar',
                }}
                cancelation={{
                    onClick: () => setShow(false),
                    label: 'Cancelar',
                }}
                isOpen={show}
                onClose={() => setShow(false)}>
                <div className="flex flex-column flex-row-ns">
                    <div className="w-100 mv4 pv6-ns pl6-ns">
                        <h2 className="w-100 mv6 ttu">Editar Vendedor</h2>
                        <div className="w-100 mv6">
                            <Input
                                placeholder="Nome"
                                size="large"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                name="name"
                            />
                        </div>
                        <div className="w-100 mv6">
                            <Input
                                placeholder="telefone"
                                size="large"
                                value={cellPhone}
                                onChange={(e: any) => setCellPhone(e.target.value)}
                                name="large"
                            />
                        </div>
                    </div>
                </div>
            </ModalDialog>
        </div>
    )
}


export default ModalEdit