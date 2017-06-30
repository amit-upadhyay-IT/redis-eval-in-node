  var globalMods =require("./globalmods");

var path = require('path');
global.appRoot = path.resolve(__dirname);
var myConfig=require("./config/index")
var express = require('express');
var http = require('http');
var app = express();
var favicon=require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http_logger = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var server  = require('http').createServer(app);
var router = express.Router();
var logDirectory = __dirname + '/log';
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
const mongoose = require('mongoose');
var router = express.Router();
var sio = require("socket.io")(server);
var myPassport=  require('./authentication').init(app);
var passport = require('passport');

var router_reg=require('./index')(router);
var myRedis = require('./Utilities/myRedis')(myConfig);
var myRedis2 = require('./Utilities/myRedis')(myConfig);
//var debug = require('debug')('main')
 

//var dbConfig = require('./helpers/mongoDB.js');
var cors = require('cors')
var logger=globalMods.loggerSys;
// enable json and form urlencoded payload parsing capability

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set the public folder path
app.use(express.static(path.join(__dirname, myConfig.publicFolder)));

//Set the fav icon path
app.use(favicon(__dirname + myConfig.publicFolder+'/favicon.ico'));
//use Redis as Session storage
 
 
app.use(session({
    store: new RedisStore(
        myConfig.redisdb
    ),
    secret: '123456',
    resave: true,
    saveUninitialized: true
}))

//// Authentication for webform  from Request Cookeis
 app.use(passport.initialize())
 app.use(passport.session())


 
/* Todo  Socket Io

 var mySocket=require('./Utilities/mySocket')(sio,app,new RedisStore(
        myConfig.redisdb
    ),cookieParser);
    */


// Authentication to be implemented here
app.use(function(req, res, next){
  console.log( myRedis.set_value_hashset({name:"vipul",age:11,points:50}).then(function(data){
    console.log(data);
    }
  ));

console.log(myRedis.execute_lua_script().then(function(data){
    console.log(data);
}));

//   console.log( myRedis.add_values_hashset({key:"division",value:"BSG"}).then(function(data){
//     console.log(data);
//     }
//   ));

//   console.log( myRedis.update_values_hashset({key:"points",value:92}).then(function(data){
//     console.log(data);
//     }
//   ));

//   console.log( myRedis.delete_hashset_entry("division").then(function(data){
//     console.log(data);
//     }
//   ));

  console.log(myRedis.execRedisCmds().then(function(data){
console.log(data);
  }));
    console.log("to be called for all requests, Authentication to be implemented here" + req.session.id);
    next();
});




//Logger Setup

fs.existsSync(myConfig.loggerConfig.logFolder) || fs.mkdirSync(myConfig.loggerConfig.logFolder)


app.use(function(err,req, res,next) {
    logger.error("handle error");
    res.status(500).json({ error: 'Error occured' });
});

app.post('/login',
 passport.authenticate('local', {
    successRedirect: '/mydata',
    failureRedirect: '/mydata2'
  })) 

  app.post('/loginapi',
 passport.authenticate('bearer', {
    successRedirect: '/mydata',
    failureRedirect: '/mydata2',
    session: false
  })) 


app.use(router_reg);
app.get('/mydata',function(req,res){
    //   logger.info(req);
    ServerRequest(req,res);
    }
);


function ServerRequest(req, res) {
    res.sendfile(__dirname+"/public/index.html");
}

app.get('/Jquery.js',function(req,res){
      res.sendfile(__dirname+"/public/JQuery.js");
    }
);


server.listen(3000, function(){
     logger.info("Express server listening on port " + '3000' + " from folder " + __dirname );
});
