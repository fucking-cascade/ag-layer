const Koa = require('koa')
const Router = require('koa-router')
const convert = require('koa-convert')
const session = require('koa-session')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const {graphqlKoa, graphiqlKoa} = require('apollo-server-koa')

const RedisStore = require('../utils/koa-ioredis')
const {
  sessionKey,
  cookie,
  redisConfig,
  graphqlRoute,
  graphiqlRoute,
  port,
} = require('../config')
const schema = require('./modules')

const app = new Koa()
const router = new Router()

const sessionConfig = {
  key: sessionKey,
  store: new RedisStore(redisConfig),
  ...cookie
}

app.use(convert(cors()))

app.keys = ['keys']
app.use(session(sessionConfig, app))
app.use(async (ctx, next) => {
  if ('/favicon.ico' === ctx.path) return

  await new Promise(resolve => {
    setTimeout(resolve, 2000)
  })
  if (!ctx.session.hasLogin) {
    ctx.session.hasLogin = true
    console.log('You need to login')
  } else {
    console.log('Have logined')
  }

  await next()
})

app.use(logger())

router.post(graphqlRoute, bodyParser(), graphqlKoa({schema}))
router.get(graphqlRoute, graphqlKoa({schema}))

router.get(graphiqlRoute, graphiqlKoa({endpointURL: graphqlRoute}))

app.use(router.routes()).use(router.allowedMethods())

app.listen(port)
console.log(`the server is start at port ${port}`)
