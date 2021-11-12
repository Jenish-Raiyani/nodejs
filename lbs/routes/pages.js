const express = require('express');
const router = express.Router();

const mysql = require('mysql');

 

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"librarydb",

});
 
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Database Connected")
    }

});
router.get('/',(req, res)=>{


res.render('index', {message : 'Welcome, ' + req.session.email});
});

router.get('/register',(req, res)=>{
    res.render('register');
});
router.get('/login',(req, res)=>{
    res.render('login');
});

router.get('/dashboard',(req, res)=>{
  res.render('dashboard');
});

router.get('/logout', function(req, res, next){
    if(req.session.email){
      req.session.destroy();
      res.redirect('/');
    }
  })

router.get('/addbook',(req, res)=>{
 
    res.render('addbook');
});


module.exports= router;
    



router.get('/booklist',(req, res)=>{

    db.query('SELECT * FROM books',(error,data)=>{
           if(error){
               console.log(error);
           }
           else{
               
             
               return res.render('booklist',{
                 Bookdata: data
             });
              
                 
           } 
       });
  
    
 } 
 
  
  
  
 );


 router.get('/booklist/editbook/:id', function(req, res, next) {
    var BookId= req.params.id;
    var sql=`SELECT * FROM books WHERE id=${BookId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
     
      return res.render('editbook', { title: 'Book List', editData: data[0]});
    });
});
router.post('/booklist/editbook/:id', function(req, res, next) {
var id= req.params.id;

const {isbn,title,edition,copies,author,publisher,url} = req.body;
var updateData={isbn:isbn,	Book_title:title,Edition:edition,Total_copies:copies,Authors:author,Publisher:publisher,url:url}

 
  var sql = `UPDATE books SET ? WHERE id= ?`;
  db.query(sql, [updateData, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
});


return res.render('editbook',{
    message: "Book Data Updated Successfully"
});
});