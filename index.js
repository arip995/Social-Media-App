const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const {MONGODB} = require('./config.js')
// const gql = require('graphql-tag');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  #type Book {
  #  title: String
  #  author: String
  #}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  #type Query {
  # books: [Book]
  #}
  type Query {
      sayHi: String!
  }
`;

const resolvers = {
    Query:{
        sayHi: () => 'Hello World!',
    }
}

const server = new ApolloServer({ 
    typeDefs,
    resolvers
 });

 mongoose.connect(MONGODB,{useNewUrlParser:true})
 .then(() =>{
     console.log('hii')
     return server.listen({port: 3000})
 }).then((res) => {console.log(`Server running at port ${res.url}`)});
