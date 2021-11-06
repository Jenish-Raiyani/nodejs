const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res)=>{
  
    res.setHeader("Content-Type", "text/html");

    if(req.url == '/'){
        res.statusCode= 200;
        res.end("<h1>Welcome To My Website</h1>");

    }
    else if(req.url == '/contact'){
        res.statusCode= 200;
        res.end("<h1>Contact Us</h1>");

    }
    else{
        res.statusCode= 200;
        res.end("<h1>Page Not Found</h1>");

    }
})


server.listen(port, ()=>{
    console.log(port);

});
