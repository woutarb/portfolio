const express = require('express');
const pug = require('pug');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;

app.get('/',(req, res) =>{
    res.send('welcome');    
});

app.listen(port, ()=>{
    console.log(`Beermatching app listening on port ${port}!`);
});
