
const express = require ('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const config = require ('./config/database');
const routeuser = require('./user/controller');
const bodyParser = require('body-parser');



const connection = mongoose.connect(config.database, {
  useNewUrlParser: true, useUnifiedTopology: true });

if(connection){
console.log("database connected");
}

else{
console.log("database connection error");
}


//request read as json
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/user",routeuser);

app.listen(port,function(){
    console.log("server is " + port);

});