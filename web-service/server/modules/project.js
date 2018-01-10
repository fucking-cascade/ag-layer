const {apis, db} = require('../db/project')

const typeDefine = `
  type Project {
    id: ID
    ownerId: ID
    name: String
    description: String
  }

  type Query {
    getProject(id: ID!): Project
    getProjectByOwner(id: ID!): [Project]
    projects: [Project]
  }

  type Mutation {
    addProject(ownerId: ID!, name: String!, description: String): Project
  }
`

const resolver = {
  Query: {
    getProject (root, {id}, ctx) {
      return apis.find(id)
    },
    getProjectByOwner (root, {id}, ctx) {
      return apis.findByOwner(id)
    },
    projects (root, args, ctx) {
      return db
    },
  },
  Mutation: {
    addProject (root, {ownerId, name, description}, ctx) {
      return apis.add(ownerId, name, description)
    },
  },
}

module.exports = {
  typeDefine,
  resolver,
}