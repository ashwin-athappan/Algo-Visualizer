const userResolver = require('./users')

const resolvers = {
    Query: {
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}

module.exports = resolvers;