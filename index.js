const express = require('express');
const pug = require('pug');
require('dotenv').config();
const mongoose = require('mongoose');
const workModels = require('./models/workMade');

const app = express();
const port = process.env.PORT;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')

// Setting up mongoose connection data like the database name, allowing it to error
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, dbName:process.env.DB_NAME});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.get('/',(req, res) =>{
    res.send('welcome');    
});

app.listen(port, ()=>{
    console.log(`Beermatching app listening on port ${port}!`);
});
