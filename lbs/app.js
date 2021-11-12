const express = require('express');
const mysql = require('mysql');
const app = express();
const dotenv =require('dotenv');
const path= require('path');
dotenv.config({path:'./.env'});

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABSE,

});




const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','hbs');
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Database Connected")
    }

});
var session = require('express-session');
 

app.use(session({
  secret : 'ABCDefg',
  resave : false,
  saveUninitialized : true
}));
//routes

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/addbook',require('./routes/addbook'));

/*
app.get('/', (req,res)=>{

    res.render('index')
});
app.get('/register', (req,res)=>{

    res.render('register')
});
*/
app.listen(3000,()=>{
    console.log("Server started")
})