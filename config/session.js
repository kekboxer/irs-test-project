const session = require('express-session');
const redis = require('redis')
const RedisStore = require('connect-redis')(session);
const config = require('config')

let redisClient = redis.createClient({
    host: config.get('redis_host'),
})

module.exports = sessionMiddleware = session({
    store: new RedisStore({client: redisClient}),
    secret: config.get('secret_key'),
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
    },
});