/**
 * Created by xueyingchen.
 */
const {PORT, REDIS_HOST, REDIS_PORT} = process.env

const config = {
  port: PORT || 3001,
  redis: {
    host: REDIS_HOST || '127.0.0.1',
    port: REDIS_PORT || 6379
  },
  sessionKey: 'yy:id',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, //one day in ms
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
  },
  graphqlRoute: '/graphql',
  graphiqlRoute: '/graphiql'
}

module.exports = config