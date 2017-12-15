/**
 * Created by xueyingchen.
 */

// fake data

const casual = require('casual')

casual.define('user', () => {
  return {
    id: casual.uuid,
    email: casual.email,
    name: casual.name,
    sex: casual.random_element(['male', 'female', 'other']),
    phoneNumber: casual.phone,
    address: casual.address
  };
});

const users = new Array(100).fill(1).map(() => casual.user)

const tools = {
  findUser (users, id) {
    return users.find(user => user.id === id)
  },
  addUser (users, user) {
    users.push(user)
    return user
  }
}

/**********************************************/

const typeDefine = `
  type User {
    name: String
    id: String
    sex: String
    email: String
    phoneNumber: String
    address: String
    matches: [User]
  }

  type Query {
    getUser(id: String!): User
    users: [User]
  }

  # Mutations
  type Mutation {
    addUser(name: String!, sex: String!): User
  }
`

const resolver = {
  User: {
    matches ({sex}, args, ctx) {
      return users.filter(use => use.sex !== sex)
    }
  },
  Query: {
    getUser (root, {id}, ctx) {
      return tools.findUser(users, id)
    },
    users (root, args, ctx) {
      return users
    }
  },
  Mutation: {
    addUser (root, {name, sex}, ctx) {
      return tools.addUser(users, {name, sex, id: Math.random().toString(16).substr(2)})
    }
  }
}

module.exports = {
  typeDefine,
  resolver
}