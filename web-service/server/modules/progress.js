const {apis, db} = require('../db/progress')

const typeDefine = `
  type Progress {
    id: ID
    ownerId: ID
    projectId: ID
    name: String
    order: Int
  }

  type Query {
    getProgress(id: ID!): Progress
    getProgressByOwner(id: ID!): [Progress]
    getProgressByProject(id: ID!): [Progress]
    progresses: [Progress]
  }

  type Mutation {
    addProgress(ownerId: ID!, projectId: ID!, name: String!): Progress
  }
`

const resolver = {
  Query: {
    getProgress (root, {id}, ctx) {
      return apis.find(id)
    },
    getProgressByOwner (root, {id}, ctx) {
      return apis.findByOwner(id)
    },
    getProgressByProject (root, {id}, ctx) {
      return apis.findByProject(id)
    },
    progresses (root, args, ctx) {
      return db
    },
  },
  Mutation: {
    addTask (root, {ownerId, projectId, name}, ctx) {
      return apis.add(ownerId, projectId, name)
    },
  },
}

module.exports = {
  typeDefine,
  resolver,
}