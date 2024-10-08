// Import model express
const express = require('express');

//app express
const app = express();

// Import model mysql
const mysql = require('mysql2');

// Add bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Manipulação dos dados via rota
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Import model express-handlebars
const { engine } = require('express-handlebars');

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

// Route form
app.get('/form', function(req, res) {
  res.render('form');
})

// Route list
app.get('/list', function (req, res) {
  // Sql query
  let sql = 'SELECT * FROM client';

  // Execute query
  conection.query(sql, function (error, ret) {
    if (error) throw (error);

    //Object client receives return from query
    res.render('list', {client:ret});
  });
})

// Route register
app.post('/register', function(req, res) {

  // Geting data form
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var password = req.body.password;
  
  // Sql query
  let sql = `INSERT INTO client (name, idade, email, password) 
  VALUES ('${name}', ${age}, '${email}', '${password}')`;

  // Execute query
  conection.query(sql, function(error, ret) {
      if(error) throw error;
      console.log(ret);
      
  });
  // Redirect to from
  res.redirect('/list');
  res.end();
})

// Route delete
app.get('/delet/:id', function (req, res) {
  // Sql query
  let sql = `DELETE FROM client WHERE id = ${req.params.id}`;
  // Execute query
  conection.query(sql, function(error, ret) {
    if(error) throw (error);
    console.log(ret);
  })
  
   // Redirect to from
  res.redirect('/form');
  res.end();
})

//Route edit
app.get('/edit/:id', function(req, res) {
  let sql = `SELECT * FROM client WHERE id= ${req.params.id}`;

  conection.query(sql, function(error, ret) {
    if(error) throw (error);
    console.log(ret);
    res.render('edit', {client:ret});
  })
  
})

//Route Update
app.post('/update', function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var password = req.body.password;

  let sql = `UPTADE FROM client (name, idade, email, password) VALUES
  ('${name}', ${age}, '${email}', '${password}') WHERE id = ${id}`;

  conection.query(sql, function(error, ret) {
    if(error) throw (error);
    console.log(ret);
  })
  res.redirect('/list');
  res.end();

})

//Server
app.listen(8080);