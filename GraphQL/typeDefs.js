const { gql } = require('apollo-server');

module.exports = gql`
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
  type User {
      id: ID!,
      email: String!,
      token: String!,
      username: String!,
      createdAt: String!,
  }
  input RegisterInput {
      username: String!,
      password: String!,
      confirmPassword: String!,
      email: String!,
      # type input is to show that how a query would look like
  }
  type Mutation {
      register(registerInput:RegisterInput):User!
      #the register query should pass a parameter registerInput which should look like RegisterInput and should retutn some value of type User
      login(username:String!,password:String!):User!
  }
`;