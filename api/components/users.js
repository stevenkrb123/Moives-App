const express = require('express');
const db = require('../db');
const router = express.Router();
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
const saltRounds = 4;

passport.use(new Strategy((email, password, cb) => {
    db.query('SELECT Id, email, password FROM users WHERE email = ?', [email]).then(dbResults => {
  
      if(dbResults.length == 0)
      {
        return cb(null, false);
      }
  
      bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
        if(bcryptResult == true)
        {
          cb(null, dbResults[0]);
        }
        else
        {
          return cb(null, false);
        }
      })
  
    }).catch(dbError => cb(err))
  }));

router.get('/auth',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    db.query('SELECT * FROM users ').then(results => {
      res.json(results);
      console.log(":");
    })
  });
//  Return all dog information 
router.get('/', (req, res) => { 
    db.query('SELECT * FROM users').then(results => {
        res.json({ users : results})
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

 // Return information of a single dog 
router.get('/:userId', (req, res) => {
    db.query('SELECT * FROM users where Id = ?', [req.params.userId])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})


router.post('/', (req, res) => {
    let email = req.body.email.trim();
    let password = req.body.password.trim();
  
    if((typeof email === "string") &&
       (email.length > 4) &&
       (typeof password === "string") &&
       (password.length > 6))
    {
      bcrypt.hash(password, saltRounds).then(hash =>
        db.query('INSERT INTO users (email, password) VALUES (?,?)', [email, hash])
      )
      .then(dbResults => {
          console.log(dbResults);
          res.sendStatus(201);
      })
      .catch(error => res.sendStatus(500));
    }
    else {
      console.log("incorrect email or password, both must be strings and email more than 4 long and password more than 6 characters long");
      res.sendStatus(400);
    }
  })
  

router.delete('/:userId', (req, res) => {
    db.query('DELETE FROM users where id = ?', [req.params.userId])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;