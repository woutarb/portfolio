const express = require('express');
const pug = require('pug');
require('dotenv').config();
const mongoose = require('mongoose');
const workModels = require('./models/workMade');

const app = express();
const port = process.env.PORT;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug')

// Setting up the string needed to connect to the database, using ENV with a healthy combination of gitignore to keep information safe.
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0u7k.mongodb.net/Cluster0?retryWrites=true&w=majority`

// Setting up mongoose connection data like the database name, allowing it to error
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, dbName:process.env.DB_NAME});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.get('/',(req, res) =>{
    //res.send('welcome');    
    workModels.Work.find((err,madeWork)=>{
        res.render('index',{workList: madeWork})
    });
    

});

app.listen(port, ()=>{
    console.log(`Portfolio app listening on port ${port}!`);
});
