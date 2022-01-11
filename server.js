const express = require('express');
const app = express();
const mongoose =require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const Content = require('./models/content')

// Route Dependencies


//Initiliaze depenecies
require('dotenv').config();
app.use(morgan('dev'));
app.set('view engine', 'ejs');

//Listeners
const {PORT , MONGODB_URI} = process.env

//Database connection
mongoose.connect(MONGODB_URI)

const db = mongoose.connection
db.on('connected', ()=> console.log('Connected to MongoDB'))
db.on('disconnected', ()=> console.log('disconnected to MongoDB'))
db.on('error', (error)=> console.log('MongoDB Error' + error.message));

//Middleware 

app.use(express.urlencoded({extended: false}));


//Index route
app.get('/', (req, res)=>{
 res.render('index')
});


//new route
app.get('/content/new',(req, res)=>{
    res.render('new')
});


//Delete Route
app.delete('/content/:id',(req, res)=>{
    Content.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect('/')
    })
});


//create route
app.post('/',(req, res)=>{
    Content.create(req.body, (err, item)=>{

        res.redirect('/')
    });
});



//Server Listening
app.listen(PORT,()=>{
    console.log(`Server do be listening on port: ${PORT}`)
})