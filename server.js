const Joi = require('@hapi/joi');
const express = require('express');
const req = require('express/lib/request');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const bodyParser = require('body-parser');
//connecting to db
const dbURI = 'mongodb+srv://nshutiDev:mongodb123@mybrand.zzjdo.mongodb.net/My-Brand?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => console.log('connect to db'))
.catch((err) => console.log(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get('/add-blog', (req, res) => {
   
})
app.get('/articles', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})
app.get('/one-article', (req, res) => {
    Blog.findById()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
})
     app.post('/articles',  async (req, res) => {
        // const blog = req.body;
        console.log(req.body);
        try{
            console.log ('done');
          const blog = new Blog({
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body
        });
         const data = await blog.save();
         res.json(data);
        }
        catch(error){
        res.json(error.message)    
        console.log(error.message)
        }
      });
app.get('/articles/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.send(result)
    })
    .catch((error) => {
        console.log(err);
    })
});
    app.put('/articles/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndUpdate(id)
        const blog = new Blog(req.body);
        blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
    });
    app.delete('/articles/:id', (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndDelete(id)
        .then(result => {
            res.send("blog delete successfully");
        })
        .catch((err) => {
            console.log(err);
        })
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})