import { queries as vbaseQueries, mutations as vbaseMutations } from './vbase'

export const resolvers = {
    Query: {
        ...vbaseQueries,
    },
    Mutation: {
        ...vbaseMutations,
    },
}