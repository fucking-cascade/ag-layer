/**
 * Created by xueyingchen.
 */
const {makeExecutableSchema} = require('graphql-schema-tools')

const {getDirModules} = require('../../utils')

const mainDefines = [`
  schema {
    query: Query,
    mutation: Mutation
  }
`]

const modules = getDirModules(__dirname)
  .map(([_, module]) => module)

const resolvers = modules.map(({resolver}) => resolver).filter(undef => undef)

const typeDefs = mainDefines.concat(modules.map(({typeDefine}) => typeDefine).filter(undef => undef))

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})

module.exports = schema