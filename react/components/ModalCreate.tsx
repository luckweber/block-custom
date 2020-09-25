import React, { FunctionComponent, useState } from 'react'
import {
    ModalDialog,
    Input,
    Alert
} from 'vtex.styleguide'
import saveGACodeMutation from './../graphql/mutations/saveVBase.gql'
import { useApolloClient } from 'react-apollo'
import { STORE_SELLERS, useDataContext } from '../utils/DataContext'

interface CustomProps {
    show: any
    setShow: any
    data: any
}

const ModalCreate: FunctionComponent<CustomProps> = ({ show, setShow }) => {

    const [cellPhone, setCellPhone] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const client = useApolloClient();
    const [error, setError] = useState({ status: false, message: '' })
    const variables = { bucket: 'sellers', path: 'sellers.json' }

    const { setSellers, sellers } = useDataContext()

    const handleSave = () => {

        if (cellPhone.length >= 8 && name.length >= 3) {

            const newSeller = { cellPhone, name, id: new Date().getTime(), image }
            sellers.push(newSeller)

            try {
                client.mutate({
                    mutation: saveGACodeMutation,
                    variables: {
                        ...variables,
                        data: JSON.stringify(sellers),
                    },
                }).then(() => {
                    setSellers(sellers)
                    STORE_SELLERS.setItem(sellers)
                    setShow(false)
                    setError({ status: false, message: '' })
                    setName('')
                    setImage('')
                    setCellPhone('')
                })

            } catch (error) {
                console.log(error);

            }
        } else if (name.length < 3) {
            setError({ message: "Nome permitidos com mais de 2 caracteres", status: true })
        } else if (cellPhone.length < 8) {
            setError({ message: "Telefone invalido", status: true })
        }
    }



    return (
        <div>
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
                        {
                            (error.status) && (
                                <Alert type="error" onClose={() => console.log('Closed!')}>
                                    {error.message}
                                </Alert>
                            )
                        }
                        <h2 className="w-100 mv6 ttu">Criar Novo Vendedor</h2>
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
                                name="telefone"
                            />
                        </div>
                        <div className="w-100 mv6">
                            <Input
                                placeholder="Imagem"
                                size="large"
                                value={image}
                                onChange={(e: any) => setImage(e.target.value)}
                                name="Imagem"
                            />
                        </div>
                    </div>
                </div>
            </ModalDialog>
        </div>
    )
}


export default ModalCreate