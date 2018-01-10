const {apis, db} = require('../db/subTask')

const typeDefine = `
  type SubTask {
    id: ID
    userId: ID
    taskId: ID
    content: String
    state: Boolean
  }

  type Query {
    getSubTask(id: ID!): SubTask
    getSubTaskByUser(id: ID!): [SubTask]
    getSubTaskByTask(id: ID!): [SubTask]
    subTasks: [SubTask]
  }

  type Mutation {
    addSubTask(userId: ID!, taskId: ID!, content: String!): SubTask
  }
`

const resolver = {
  Query: {
    getSubTask (root, {id}, ctx) {
      return apis.find(id)
    },
    getSubTaskByUser (root, {id}, ctx) {
      return apis.findByUser(id)
    },
    getSubTaskByTask (root, {id}, ctx) {
      return apis.findByTask(id)
    },
    subTasks (root, args, ctx) {
      return db
    },
  },
  Mutation: {
    addTask (root, {userId, taskId, content}, ctx) {
      return apis.add(userId, taskId, content)
    },
  },
}

module.exports = {
  typeDefine,
  resolver,
}