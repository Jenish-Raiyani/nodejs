const tutorial = require('./tutorial');
const EventEmitter = require('events');
const readline = require('readline');
const http = require('http');


/*
console.log(tutorial.sum(111,1));
console.log(tutorial.PI)
console.log(new tutorial.mathobject)*/

//EventEmitter

/*

const eventemitter = new EventEmitter();

eventemitter.on('sum', (n1,n2)=>{

    console.log(n1+n2);

});

eventemitter.emit('sum',12,12);
*/

//readline

/*
const readl= readline.createInterface({input:process.stdin , output : process.stdout});

let num1 = Math.floor((Math.random() * 10)+1);
let num2 = Math.floor((Math.random() * 10)+1);
let ans = num1 + num2;

readl.question(`what is ${num1}+ ${num2} ?`,(userInput)=>{
   
    if(userInput.trim() == ans){
        readl.close();
    }
    else{
        readl.setPrompt("Incorrect Answer try again ");
        readl.prompt();
        readl.on('line',(userInput)=>{
            if(userInput.trim() == ans){
                readl.close();
            }
            else{
                readl.setPrompt("Incorrect Answer try again ");
                readl.prompt();

            }

        })
    }
});
readl.on('close',()=>{
    console.log("Your Answer Is Correct");
});
*/


//http server

const server = http.createServer((req,res)=>{
    res.write("Hello World");
    res.end();
});

server.listen(3000);