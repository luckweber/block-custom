import { isEmpty } from 'ramda'
import VBaseError from '../../errors/VBaseError'
import { ServiceContext } from '@vtex/api'

export const queries = {
    getVBase: async (_: any, args: any, ctx: ServiceContext) => {

        try {
            const {
                clients: {
                    vbase,
                },
            } = ctx

            const {
                bucket,
                path,
            } = args



            let srcFile = await vbase.getJSON<any>(bucket, path, true) || {}

            if (isEmpty(srcFile)) {
                throw new VBaseError('File dont found', 404, _, path)
            }

            if (typeof srcFile === 'object') {
                srcFile = JSON.stringify(srcFile)
            }

            return srcFile


        } catch (error) {
            throw error
        }
    }
}

export const mutations = {
    deleteVBase: async (_: any, args: any, ctx: ServiceContext) => {
        try {

            const { clients: { vbase } } = ctx
            const { bucket, path } = args

            await vbase.deleteFile(bucket, path)
            return "Delete File"

        } catch (error) {
            throw error
        }
    },
    saveVBase: async (_: any, args: any, ctx: ServiceContext) => {

        try {
            const { clients: { vbase } } = ctx
            const { bucket, path, data } = args

            let srcFile = data

            if (typeof data == 'string') {
                srcFile = JSON.parse(srcFile)
            }

            await vbase.saveJSON(bucket, path, data)
            return JSON.stringify(srcFile)

        } catch (error) {
            throw error
        }

    }
}