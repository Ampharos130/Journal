const express = require('express');
const app = express();
const mongoose =require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const Content = require('./models/content')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}));


//Index route
app.get('/', (req, res)=>{
    Content.find({}, (err, allContent)=>{

        res.render('index', {
            content: allContent
        });
    });
});

//New route
app.get('/content/new',(req, res)=>{
    res.render('new')
});


//Delete Route
app.delete('/content/:id',(req, res)=>{
    Content.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect('/')
    })
});


//Create route
app.post('/',(req, res)=>{
    Content.create(req.body, (err, item)=>{

        res.redirect('/')
    });
});




//Show route
app.get('/content/:id', (req, res)=>{
    Content.findById(req.params.id, (err, foundContent)=>{

        res.render('show',{
            content: foundContent
        });
    });
});

//Server Listening
app.listen(PORT,()=>{
    console.log(`Server do be listening on port: ${PORT}`)
})