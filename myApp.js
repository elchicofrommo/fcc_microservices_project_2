
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(logger);

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");


const indexView = __dirname + "/views/index.html";
const helloWorld = (req, res) => {
  res.sendFile(indexView);
}

/** 2) A first working Express Server */
app.get("/", helloWorld);

/** 3) Serve an HTML file */


/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
const jsonHandler = (req, res) => {
  let worldVar =  {
    name: "Mario",
    age: 23, 
    isTrueAge: false,
    message: "Hello json"
  }
  
  let toReturn = {};
  console.log("message style is " + process.env.MESSAGE_STYLE);
  for(const property in worldVar){

    console.log(property);
    
    if(process.env.MESSAGE_STYLE == 'uppercase' && typeof worldVar[property] === 'string')
       toReturn[property] =  worldVar[property].toUpperCase();
    else
      toReturn[property] =  worldVar[property];
  }
  res.json(toReturn);
}
app.get("/json", jsonHandler)

/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
function logger(req, resp, next){
  console.log(`${req.method} ${req.path} - ${req.ip} `);
  next();
}

/** 8) Chaining middleware. A Time server */
function addTime(req, res, next){
  req.time = new Date().toString();
  next();
}

function nowHandler(req, res){
  res.send({time: req.time});
}

app.get('/now', addTime, nowHandler);

/** 9)  Get input from client - Route parameters */
function echoHandler(req, res){
  res.send({echo: req.params.word});
}
app.get('/:word/echo', echoHandler);

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
function nameHandler(req, res){
  res.send({name: `${req.query.first} ${req.query.last}`})
}
app.get('/name', nameHandler);

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}));

/** 12) Get data form POST  */
function postNameHandler(req, res){
  res.send({name: `${req.body.first} ${req.body.last}`})
}
app.post('/name', postNameHandler);

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
