const http = require('http');
const fs = require('fs');
http.createServer((req, res)=>{
    const readFile = fs.createReadStream('./index.html');
    res.writeHead(200,{'Content-Type': 'text/html'});
    readFile.pipe(res);
}).listen(3000);