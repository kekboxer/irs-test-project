const express = require('express');
const config = require('config');

// Database
const db = require('./config/database');

const app = express();

const PORT = config.get('port') || 5000;

const initModels = require('./models/init-models');

const models = initModels(db); // define models

// Test connection to Database
db.authenticate()
    .then(() => console.log('Database connected.'))
    .catch((e) => console.log('Error', e.message));

db.sync()

models.R1022.findAll({where:{utv: "1"}, raw: true })
    .then(res=>{
        console.log(res);
    }).catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})