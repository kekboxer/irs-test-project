const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const sessionMiddleware = require('./config/session');

const app = express();

// Database
const dataBase = require('./config/database');
console.log(dataBase)
// Define models
const initModels = require('./models/init-models');
const models = initModels(dataBase);
module.exports.models = models;

// Connect session store and passport
app.use(sessionMiddleware);
app.use(cookieParser(config.get("cookie_key")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        //origin: "http://localhost", // <-- location of the react app were connecting to
        credentials: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

module.exports.passport = passport;

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/supply', require('./routes/supply.routes'));

const PORT = config.get('port') || 5000;

function start() {
    try {
        const connect = () => {
            setTimeout(() => {
                dataBase.authenticate()
                    .then(() => console.log('Database connected.'))
                    .catch((e) => {
                        console.log('Error', e.message);
                    });
            }, 5000)
        }
        connect();
        dataBase.sync();

        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log("Something went wrong")
    }
}

start();