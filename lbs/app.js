const express = require('express');
const mysql = require('mysql');
const app = express();
const dotenv =require('dotenv');
const path= require('path');
const CircularJSON = require('circular-json');
dotenv.config({path:'./.env'});

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"librarydb",

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
app.use('/',require('./routes/managelocation'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.post('/getbook',(req,res)=>{
    let payload = req.body.payload.trim();
    
   let search =  db.query('SELECT * FROM books WHERE Book_title = ?', [payload], async (error,result)=>{
        if(error){
            console.log(error);
        }
        else{
              
            //console.log(result)
        } 
    });
    
    //search = search.s(0,10);
    const str = CircularJSON.stringify(search);
     
   
   res.send({payload:JSON.parse(str)});
}); 
app.post('/searchresult',function(req,res){
   
    stringPart = req.body.term
       
   
    console.log(stringPart);

    db.query('SELECT * FROM books WHERE Book_title LIKE "%'+stringPart+'%"',function(err, rows, fields) {
        if (err) throw err;
      
        
       
        //res.send(JSON.stringify(rows));
        console.log(rows)
        return res.render('searchresult',{
          
            result:rows
        }); 
    });
});
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