const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const joi = require('@hapi/joi')
/*
app.get('/', (req, res)=>{
    res.send("Hello world");
});
*/
/*
app.get('/student/:name/:no', (req, res)=>{
    console.log(req.params);
    console.log(req.query);
    res.send(req.params.name + " : " + req.params.no);


});

*/
path =require('path');
app.use('/public',express.static(path.join(__dirname,'index.html')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'index.html'));

});

app.post('/',(req, res)=>{
    console.log(req.body);
    const schema = joi.object().keys({
        email: joi.string().trim().email().required(),
        password: joi.string().min(5).max(10).required()
    });
   // res.send("data added");
   joi.validate(req.body,schema,(err,result)=>{
       if(err){
           res.send("Data not added");
       }
       console.log(result);
       res.send("Data added");
   });
   res.send("Data added");
   //res.json({success:true});
});
app.listen(3000);