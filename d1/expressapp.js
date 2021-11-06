const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res)=>{
    res.send("<h1>Welcome To My Website</h1>")
})

app.listen(port,()=>{
    console.log(`Port Number ${port} Listen`)

});