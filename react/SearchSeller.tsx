import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import getVBase from './graphql/queries/getVBase.gql'

const SearchSeller = () => {

    const variables = { bucket: 'sellers', path: 'sellers.json' }
    const { data, loading, error } = useQuery(getVBase, { variables, fetchPolicy: "network-only" });
    const [sellers, setSellers] = useState([])

    useEffect(() => {
        if (!loading && !error) {
            let dt = JSON.parse(data?.getVBase) || []
            console.log(dt);
            setSellers(dt)
        }
    }, [loading])


    const renderRows = sellers.map((prop) => <SearchSelleritem data={prop} />)

    return <div className="w-100 vh-100 pa6">

        <div className="w-100 flex-ns">
            <div className="w-30 mr4" >
                <img className="br-100 br2" src="https://storage.googleapis.com/lemon-sellers/eccf0592-6b9a-4161-875c-944044e40d55_91535243_862213170963320_6473522683039449088_n.png" />
            </div >
            <div className="w-70">
                <h4 className="w-100 b">Loja Meier</h4>
                <p className="w-100 ">Rio De Janeiro</p>
                <p className="w-100 ">{sellers.length} Vendedores disponíveis</p>
            </div>
        </div >

        <div className="w-100">
            <p className="w-100">Nossos vendedores</p>

            <div className="w-100 sellers">
                {renderRows}
            </div>
        </div>
    </div >
}

const SearchSelleritem = ({ data: { name, image, cellPhone } }: any) => {


    return (
        <div className="w-100 flex flex-wrap mb8 sellers--info br0">
            <hr className="w-100" style={{ color: 'red', border: "1px solid rgba(0,0,0,.1)" }} />
            <div className="w-30 mr4 flex justify-center">
                <img
                    className="br-100 br2"
                    src={image}
                    style={{ objectFit: "cover", width: "100px", height: "100px" }}
                />
            </div>
            <div className="w-50">
                <p>{name}</p>
                <p className="i">Vendedor(a)</p>
                <p>{cellPhone}</p>
            </div>
            <div className="w-10 flex flex items-center">
                <a href={`https://api.whatsapp.com/send?phone=${cellPhone}&text=Oi, sou ${name}.`}>
                    <svg style={{ width: '20px' }} data-v-bdd6b5ac="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className=" arrow-profile text-magalu-color svg-inline--fa fa-chevron-right fa-w-10"><path data-v-bdd6b5ac="" fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" className=""></path></svg>
                </a>
            </div>
            <hr className="w-100" style={{ color: 'red', border: "1px solid rgba(0,0,0,.1)" }} />
        </div >
    )
}

export default SearchSeller