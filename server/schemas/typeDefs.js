const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [ID]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String, _id: ID): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveBook(bookId: ID!): User
        deleteBook(bookId: ID!): User
    }
`

module.exports = typeDefs;