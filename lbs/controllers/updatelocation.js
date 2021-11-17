
const mysql = require('mysql');

var hbs = require("hbs")
hbs.registerHelper("equal", require("handlebars-helper-equal"))
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
exports.booklocation = (req, res)=>{
    
    var BookId= req.params.id;
   
    
    var sql=`SELECT * FROM booklocation WHERE bookid=${BookId}`;
        db.query(sql, function (err, data) {
          if (err) throw err;
   
          return res.render('updatelocation', { title: 'Book List', Bookdata: data });
          
        });
 
} 
 
exports.updatebooklocation = (req, res)=>{
    
    var BookId= req.params.id;
    var location = req.body.location;
    var status = req.body.status;
    var rowid = req.body.rowid;
 
    
  //  var sql=`update location,status FROM booklocation WHERE bookid=${BookId}`;
    var sql = `UPDATE booklocation SET location = '${location}', status = '${status}' WHERE rowid = '${rowid}'`;
        db.query(sql, function (err, data) {
          if (err) throw err;
   
          //res.redirect(`/booklocation/updatelocation/${BookId}`);
          res.send(`<script>
     
          window.location.href="/booklocation/updatelocation/${BookId}";
          alert("Location Updated Successfully");

  </script>`);

          
        });
 
} 
   
    
 
   
    
 