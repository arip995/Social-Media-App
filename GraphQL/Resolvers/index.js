const postResolver = require('./post');
const userResolver = require('./user');

module.exports = {
    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}