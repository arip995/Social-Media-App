const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');


const  { MONGODB }  = require('./config.js')

const typeDefs = require('./GraphQL/typeDefs')

const resolvers = require('./GraphQL/Resolvers')
// const gql = require('graphql-tag');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.



const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context:({req})=>({req})
 });

 mongoose.connect(MONGODB,{useNewUrlParser:true})
 .then(() =>{
     console.log('MongoDB Connected')
     return server.listen({port: 3000})
 }).then((res) => {console.log(`Server running at port ${res.url}`)});
