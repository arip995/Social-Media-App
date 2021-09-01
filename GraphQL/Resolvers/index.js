const postResolver = require('./post');
const userResolver = require('./user');
//resolvers in graphql are used to run the  queries and return the desired output
module.exports = {
    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}