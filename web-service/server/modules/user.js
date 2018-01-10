const {apis, db} = require('../db/user')

const typeDefine = `
  type User {
    id: ID
    email: String
    name: String
    gender: Boolean
    address: String
    phoneNumber: String
    timestamp: String
  }

  type Query {
    getUser(id: ID!): User
    users: [User]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
  }
`

const resolver = {
  Query: {
    getUser (root, {id}, ctx) {
      return apis.find(id)
    },
    users (root, args, ctx) {
      return db
    },
  },
  Mutation: {
    addUser (root, {email, password}, ctx) {
      return apis.add(email)
    },
  },
}

module.exports = {
  typeDefine,
  resolver,
}