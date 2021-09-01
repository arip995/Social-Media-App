const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const Post = require('./Models/Post')
const { MONGODB } = require('./config.js')
// const gql = require('graphql-tag');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
type Post{
    id: ID!,
    body: String!,
    createdAt: String!,
    username: String!,
}
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
      getPosts: [Post]
  }
`;

const resolvers = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}

const server = new ApolloServer({ 
    typeDefs,
    resolvers
 });

 mongoose.connect(MONGODB,{useNewUrlParser:true})
 .then(() =>{
     console.log('MongoDB Connected')
     return server.listen({port: 3000})
 }).then((res) => {console.log(`Server running at port ${res.url}`)});
