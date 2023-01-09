var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var jwt1 = require('jsonwebtoken');
var Q = require('q');
var bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.post('/users',function(req, res){
    let user =req.body
    var deferred = Q.defer();
    if(user){
      if(user.id!=null){
        axios.put('http://localhost:3000/users/'+user.id, user)
        .then(res => {
          console.log(`statusCode: ${res.status}`);
          deferred.resolve(user);

        })
        .catch(error => {
          console.error(error);
          deferred.resolve();


        })
      }

      else {
        axios.post('http://localhost:3000/users', user)
        .then(result => {
          console.log(`statusCode: ${res.status}`);
          deferred.resolve(user);
        })
        .catch(error => {
          console.error(error);
          deferred.resolve();
        })
      }

    }


        deferred.promise.then(function (user) {
            if (user) {
                // saved successful
                res.send(user);
            }
            else {
              // saving  failed
              res.status(500).send('there is something wrong please try again later');
          }
          })
        .catch(function (err) {
                    res.status(500).send(err);
          });

});

app.listen(3002);
console.log("Listening on http://localhost:3002");
