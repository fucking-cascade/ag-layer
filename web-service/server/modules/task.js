const {apis, db} = require('../db/task')

const typeDefine = `
  type Task {
    id: ID
    ownerId: ID
    progressId: ID
    name: String
    content: String
    state: Boolean
    ddl: String
  }

  type Query {
    getTask(id: String!): Task
    getTaskByOwner(id: String!): [Task]
    tasks: [Task]
  }

  type Mutation {
    addTask(ownerId: ID!, progressId: ID!, name: String!): Task
  }
`

const resolver = {
  Query: {
    getTask (root, {id}, ctx) {
      return apis.find(id)
    },
    getTaskByOwner (root, {id}, ctx) {
      return apis.findByOwner(id)
    },
    tasks (root, args, ctx) {
      return db
    },
  },
  Mutation: {
    addTask (root, {ownerId, progressId, name}, ctx) {
      return apis.add(ownerId, progressId, name)
    },
  },
}

module.exports = {
  typeDefine,
  resolver,
}