const Koa = require('koa')
const Router = require('koa-router')
const convert = require('koa-convert')
const session = require('koa-session-minimal')
const redis = require('koa-redis')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const {graphqlKoa, graphiqlKoa} = require('apollo-server-koa')

const config = require('../config')
const schema = require('./modules')

const app = new Koa()
const router = new Router()

const sessionConfig = {
  key: config.sessionKey,
  cookie: config.cookie,
  store: new redis(config.redis)
}

app.use(convert(cors()))

app.use(session(sessionConfig))
app.use((ctx, next) => {
  if ('/favicon.ico' === ctx.path) return

  const count = ctx.session.count || 0
  ctx.session.count = count + 1
  return next()
})

app.use(logger())

const {graphqlRoute, graphiqlRoute} = config

router.post(graphqlRoute, bodyParser(), graphqlKoa({schema}))
router.get(graphqlRoute, graphqlKoa({schema}))

router.get(graphiqlRoute, graphiqlKoa({endpointURL: graphqlRoute}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port)
console.log(`the server is start at port ${config.port}`)