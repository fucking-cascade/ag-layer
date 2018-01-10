/**
 * Created by xueyingchen.
 */
const { PORT } = process.env

const config = {
  port: PORT || 3001,
  redisConfig: {
    sentinels: [{ host: 'redis-sentinel', port: 26379 }],
    name: 'mymaster'
  },
  sessionKey: 'yy:id',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, //one day in ms
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false
  },
  graphqlRoute: '/graphql',
  graphiqlRoute: '/graphiql'
}

module.exports = config
