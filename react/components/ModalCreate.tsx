import React, { FunctionComponent, useState } from 'react'
import {
    ModalDialog,
    Input
} from 'vtex.styleguide'
import saveGACodeMutation from './../graphql/mutations/saveVBase.gql'
import { useApolloClient } from 'react-apollo'

interface CustomProps {
    show: any
    setShow: any
    data: any
}

const ModalCreate: FunctionComponent<CustomProps> = ({ show, setShow, data }) => {

    const [cellPhone, setCellPhone] = useState('')
    const [name, setName] = useState('')
    const client = useApolloClient();
    const variables = { bucket: 'sellers', path: 'sellers.json' }

    const handleSave = () => {

        if (cellPhone.length >= 8 && name.length >= 3) {
            let sellers = data

            const newSeller = {
                cellPhone,
                name,
                id: new Date().getTime()
            }

            sellers.push(newSeller)

            try {
                client.mutate({
                    mutation: saveGACodeMutation,
                    variables: {
                        ...variables,
                        data: JSON.stringify(sellers),
                    },
                }).then(() => {
                    setShow(false)

                })

            } catch (error) {
                console.log(error);

            }
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
                                name="large"
                            />
                        </div>
                    </div>
                </div>
            </ModalDialog>
        </div>
    )
}


export default ModalCreate