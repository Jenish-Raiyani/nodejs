var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"iwtdb"
});

con.connect(function(error){
    if(error) throw error;
    con.query("select * from tbl_internship",function(err,result){
        if(err) throw err;
        console.log("all result are here",result)
    })

})