const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
var encoder= bodyParser.urlencoded();
app.use('/assets',express.static('assets'))
app.set('view engine','ejs');

app.get('/profile/:name', function(req, res){
    console.warn(req.params.name);
    data= {email:"jenish@gmail.com",skills:["Python","Php","Nodejs"]}
    res.render('profile',{name:req.params.name,data:data});
} );
app.get('/login',function(req, res){

    console.log(req.query)

    res.render('login')
})
app.post('/login',encoder,function(req, res){
    console.log(req.body);
    res.render('home')
})
app.get('/',function(req, res){

    res.render('home')
})


app.listen(3000);
/*
app.get('/',function(req, res){

    res.sendFile(__dirname+"/index.html")
})
app.listen(3000);*/