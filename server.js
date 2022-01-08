const express = require('express');
const app = express();
const mongoose =require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');

// Route Dependencies


//Initiliaze depenecies
require('dotenv').config();
app.use(morgan('dev'));
app.set('view engine', 'ejs');

//Listeners
const {PORT , MONGODB_URI} = process.env

//Database connection
mongoose.connect()

const db = mongoose.connection
db.on('connected', ()=> console.log('Connected to MongoDB'))
db.on('disconnected', ()=> console.log('disconnected to MongoDB'))
db.on('error', (error)=> console.log('MongoDB Error' + error.message));

//Middleware 

app.use(express.urlencoded({extended: false}));


//Server Listening
app.listen(PORT,()=>{
    console.log(`Server do be listening on port: ${PORT}`)
})