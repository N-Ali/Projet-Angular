const express = require('express');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const nJwt = require('njwt');
const config = require('./config');
const jwtAuth = require('./auth');
const upload = require('express-fileupload');

let db = new sqlite3.Database('./LoginDB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });


const router = express.Router();

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  db.run("INSERT INTO users (name, email, password) "
            + "VALUES (?, ?, ?)", req.body.name, req.body.email, hashedPassword,
      function (err) {
        if (err) return res.status(500).send("An error occurred during registration");
        res.status(200).send({ status: 'ok' });
        return "done";
      
    });
});

router.post('/verifymail', function(req, res){
  db.get("Select email FROM users WHERE email=?", req.body.email, function(err, email){
    if(err) {
      return res.status(500).send("Server error"); 
      
    }
    if(email){
      return res.status(200).send({ status: false });
    }
    res.status(200).send({ status: true });
  });
});

router.post('/verifyname', function(req, res){
  db.get("Select name FROM users WHERE name=?", req.body.name, function(err, name){
    if(err) {
      return res.status(500).send("Server error"); 
      
    }
    if(name){
      return res.status(200).send({ status: false });
    }
    res.status(200).send({ status: true });
  });
});

router.post('/login', function(req, res) {
  db.get("SELECT id, name, email, password FROM users " 
        + "WHERE email=?", req.body.email, function (err, user) {
    if (err) return res.status(500).send({status: 'Server error', err:err});
    if (!user) return res.status(404).send('User not found');

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ auth: false, token: null });
    }

    var jwt = nJwt.create({ id: user.id }, config.secret);
    jwt.setExpiration(new Date().getTime() + (24*60*60*1000));

    res.status(200).send({ auth: true, token: jwt.compact() });
  });
});

module.exports = router;

router.get('/news', function(req, res) {
  db.all("SELECT * from news ORDER BY id DESC", [], function (err, rows) {
    if (err) {
      return res.status(500).send("There was a problem finding the news.");
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    else{
      res.status(200).send({});
    }
    
  });
});

router.post('/specificnews', function(req, res) {
  db.all("SELECT * from news WHERE id=?", req.body.id, function (err, rows) {
    if (err) {
      return res.status(500).send("There was a problem finding the new.");
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    else{
      res.status(200).send({});
    }
    
  });
});

router.get('/raffles', function(req, res) {
  db.all("SELECT * from raffles ORDER BY id DESC", [], function (err, rows) {
    if (err) {
      return res.status(500).send("There was a problem finding the news.");
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    else{
      res.status(200).send({});
    }
    
  });
});

router.post('/specificraffle', function(req, res) {
  db.all("SELECT * from raffles WHERE id=?", req.body.id, function (err, rows) {
    if (err) {
      return res.status(500).send("There was a problem finding the new.");
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    else{
      res.status(200).send({});
    }
    
  });
});

router.get('/newshome', function(req, res) {
  db.all("SELECT * from news ORDER BY id DESC LIMIT 3", [], function (err, rows) {
    if (err) {
      return res.status(500).send("There was a problem finding the news.");
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    else{
      res.status(200).send({});
    }
    
  });
});

router.post('/search', function(req, res) {
  db.all("select * from news WHERE title like ? UNION  SELECT * from raffles WHERE title like ?", 
  req.body.news, req.body.raffles, function (err, rows) {
    if (err) {
      return res.status(500).send("There was a problem finding the news.");
    }
    if (rows.length > 0) {
      res.status(200).json(rows);
    }
    else{
      res.status(200).send({});
    }
    
  });
});

router.get('/profile', jwtAuth, function(req, res, next) {
  db.get("SELECT id, name, email FROM users WHERE id=?", req.userId, function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(user);
  });
});

router.post('/uploadimagenews', function(req, res) {
  console.log(req);
  if(req.files){
    console.log(req.files);
    var file = req.files.file;
    var filename = file.filename;
    file.mv("/"+filename, function(err){
      if(err){
        console.log(err);
        res.send("error occured");
      }
      else{
        console.log("succes");
        res.send("succes");
      }
    });
  }
});



//select * from news WHERE title like ? UNION  SELECT * from raffles WHERE title like ?;