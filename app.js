const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const sequelize = require('sequelize');
// const { Op } = require("sequelize");

const sessionMiddleware = require('./config/session');

const app = express();

// Database
const dataBase = require('./config/database');

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
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

module.exports.passport = passport;

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

// Test connection to Database
dataBase.authenticate()
    .then(() => console.log('Database connected.'))
    .catch((e) => console.log('Error', e.message));

dataBase.sync()

// models.R1022.findAll({
//         where: {
//             [Op.and]: [
//                 sequelize.where(sequelize.fn('char_length', sequelize.col('p00')), 10),
//                 {
//                     p00: {
//                         [Op.regexp]: '^(0|13)'
//                     }
//                 }
//             ]
//         }
//     })
//     .then(res=>{
//         console.log(res);
//     })
//     .catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})