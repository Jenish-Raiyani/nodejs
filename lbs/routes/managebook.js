const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const Handlebars = require('handlebars');
 

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
        
    }

});
router.get('/booklocation/managelocation/:id',(req, res)=>{
   
    
    var BookId= req.params.id;
    
  
    var sql=`SELECT * FROM books WHERE id=${BookId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      Object.keys(data).forEach(function(key) {
        var row = data[key];
        totalbook=row.Total_copies;
        
      });
      var arr = [];
      
        for (var i = 1; i <= totalbook; i++) arr.push(""+i);
       
      return res.render('managelocation', { title: 'Book List', Bookdata: data ,totalbook:arr});
    });
 });


 router.post('/booklocation/managelocation/:id', function(req, res, next) {

   var BookId= req.params.id;
   var sql=`SELECT * FROM books WHERE id=${BookId}`;
   db.query(sql, function (err, data) {
     if (err) throw err;
     Object.keys(data).forEach(function(key) {
       var row = data[key];
       isbn=row.ISBN;
       title=row.Book_title;
       authors=row.Authors;
       publisher=row.Publisher;
       url=row.url;
      // console.log(isbn,title,authors,publisher,url);
       
     });
    });
    console.log(req.body)
    var isbn= req.body.isbn;
    var title= req.body.title;
    var authors= req.body.authors;
    var location = req.body.location;
    var status = req.body.status;
    var publisher = "jk";
    var url= "http"
  //   console.log(status,location)
    db.query('INSERT INTO booklocation SET ?',{bookid:BookId,ISBN:isbn,title:title,authors:authors,publisher:publisher,url:url,location:location,status:status},(error,results)=>{
      if(error){
          console.log(error);
      }
      else{
          //res.redirect('/addbook');
          console.log("Location Added");
        
            
      } 
  });
  
    

});


module.exports= router;