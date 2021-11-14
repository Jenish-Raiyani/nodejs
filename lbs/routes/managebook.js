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
    console.log(BookId);
    
  
    var sql=`SELECT * FROM books WHERE id=${BookId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      Object.keys(data).forEach(function(key) {
        var row = data[key];
        totalbook=row.Total_copies;
        
      });
      /*
      var sqlq=`SELECT * FROM booklocation WHERE bookid=${BookId}`;
          db.query(sqlq, function (err, blocation) {
          if (err) throw err;
            console.log(blocation);
          //  return res.render('managelocation', { title: 'Book List',booklocation:blocation});
         
           
          callback();
        });
        db.end(); */
       
      var arr = [];
      
        for (var i = 1; i <= totalbook; i++) arr.push(""+i);
        
      console.log(arr);
      return res.render('managelocation', { title: 'Book List', Bookdata: data ,totalbook:arr});
      
    });
    
 });


 router.post('/booklocation/managelocation/:id', function(req, res, next) {
   

   var BookId= req.params.id;
   /*
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
    });*/
    console.log(req.body)
    var isbn= req.body.isbn;
    var title= req.body.title;
    var authors= req.body.authors;
    var location = req.body.location;
    var status = req.body.status;
    var publisher = req.body.publisher;
    var url= req.body.url;
    var rowid=req.body.rowid;
    
  //   console.log(status,location)
  db.query('SELECT rowid FROM booklocation WHERE rowid = ?', [rowid], async (error,result)=>{
    if(error){
        console.log(error);
    }
   
    if( result.length > 0){
      res.redirect(`/booklocation/managelocation/${BookId}`);
       ;
    }
    else {
      db.query('INSERT INTO booklocation SET ?',{rowid:rowid,bookid:BookId,ISBN:isbn,title:title,authors:authors,publisher:publisher,url:url,location:location,status:status},(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect(`/booklocation/managelocation/${BookId}`);
  
            console.log("Location Added");
            return res.render('managelocation',{
              change: "welcome"
            });
             
        } 
  
    });
    

    }
    

   
}); 
  
    
    

});


module.exports= router;