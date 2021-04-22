const express = require('express');
const pug = require('pug');
require('dotenv').config();
const mongoose = require('mongoose');
const workModels = require('./models/workMade');
const path = require('path');
const { connect } = require('http2');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug')

// Setting up the string needed to connect to the database, using ENV with a healthy combination of gitignore to keep information safe.
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0u7k.mongodb.net/Cluster0?retryWrites=true&w=majority`

// Setting up mongoose connection data like the database name, allowing it to error
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, dbName:process.env.DB_NAME});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use((req, res, next) => {
    if (req.params.id == "favicon.ico") req.params.id = null;
    next();
})

app.get('/',(req, res) =>{
    //res.send('welcome');    
    workModels.Work.find((err,madeWork)=>{
        res.render('index',{workList: madeWork})
    });
});

app.listen(port, ()=>{
    console.log(`Portfolio app listening on port ${port}!`);
});

app.get('/work/:id',(req, res) =>{
    workModels.Work.findOne({})
    .where('_id').equals(req.params.id)
    .exec().then((madeWork, err)=>{
        res.render('madeWork',{madeWork: madeWork})
    })

});
/*
app.post('/', (req, res) => {
    const array =[]
    
    for(let i=0; i<array.length; i++){
        let portfolio={
            name: array[i].name,
            year: array[i].year,
            subject: array[i].subject,
            description: array[i].description,
            path: array[i].path
        }  
        const model = new workModels.Work(portfolio);
        model.save(function(err, portfolio){
            if(err){
                console.log(err); 
                return;
            } 
            res.redirect('/');
        })
    }
    console.log('done!')
})
*/

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});