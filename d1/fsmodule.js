const fs = require('fs');

//read file

/*
fs.readFile('booklist.txt','utf8',(err,data)=>{

    console.log(err,data);
})*/

const filedata= fs.readFileSync('booklist.txt');
console.log(filedata.toString());

// write file

/*
fs.writeFile("booklist.txt","\n Total Book:100",()=>{
    console.log("data added");
});*/


const addata =fs.writeFileSync("booklist.txt","total books 1000");
console.log(addata);
