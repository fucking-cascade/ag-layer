/**
 * Created by xueyingchen.
 */

// fake data
const users = [
  {
    id: '1',
    sex: 'male',
    name: 'miro'
  },
  {
    id: '2',
    sex: 'female',
    name: 'lala'
  },
  {
    id: '3',
    sex: 'male',
    name: 'joe'
  }
]

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
    getUser(root, {id}, ctx) {
      return tools.findUser(users, id);
    },
    users(root, args, ctx) {
      return users
    }
  },
  Mutation: {
    addUser(root, {name, sex}, ctx) {
      return tools.addUser(users, {name, sex, id: Math.random().toString(16).substr(2)})
    }
  }
}

module.exports = {
  typeDefine,
  resolver
}