const express = require('express')

const contentRouter = express.Router();

const Content = require('../models/content')

//Index route
contentRouter.get('/', (req, res)=>{
    Content.find({}, (err, allContent)=>{

        res.render('index', {
            content: allContent
        });
    });
});

//New route
contentRouter.get('/content/new',(req, res)=>{
    res.render('new')
});


//Delete Route
contentRouter.delete('/content/:id',(req, res)=>{
    Content.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect('/')
    })
});

//Update Route
contentRouter.put('/content/:id',(req, res)=>{
    Content.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (err, data)=>{
            res.redirect(`/content/${req.params.id}`)
        }
    )
})

//Create route
contentRouter.post('/',(req, res)=>{
    Content.create(req.body, (err, data)=>{

        res.redirect('/')
    });
});

//Edit Route
contentRouter.get('/content/:id/edit',(req,res)=>{
    Content.findById(req.params.id, (err, foundContent)=>{

        res.render('edit',{
            content: foundContent
        });
    });
});


//Show route
contentRouter.get('/content/:id', (req, res)=>{
    Content.findById(req.params.id, (err, foundContent)=>{

        res.render('show',{
            content: foundContent
        });
    });
});

module.exports = contentRouter;