// Import model express
const express = require('express');

//app express
const app = express();

// Import model mysql
const mysql = require('mysql2');

// Add bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Import model express-handlebars
const { engine} = require('express-handlebars');

//Config  handleabrs
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Creating conection with database
const conection = mysql.createConnection({
  host : '127.0.0.1',
  user: 'root',
  password: '123456',
  database : 'project'

});

// Testing conection
conection.connect(function(error){
  if(error){
    console.log('Connect failed error: ' + error);
  }else{
    console.log('Connected');
  }
})

// Route main
app.get('/form', function(req, res) {
  res.render('form');
})

//Server
app.listen(8080);