var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var jwt1 = require('jsonwebtoken');
var Q = require('q');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.post('/user/authenticate',function(req, res){
    let LoginRequest =req.body
    var deferred = Q.defer();
    if(LoginRequest){
      var user= LoginRequest.username;
      var pwd= LoginRequest.password;
          if(user=='admin' && pwd== 'admin')
          {
              // authentication successful
              deferred.resolve({
                  id: 2,
                  username: 'admin',
                  first_name: 'Janet',
                  last_name: 'Weaver',
                  password: 'admin',
                  email:"janet.weaver@reqres.in",
                  avatar:"https://reqres.in/img/faces/2-image.jpg",
                  token: jwt1.sign({ sub: 1 }, 'admin')})
          }else{
               // authentication failed
               deferred.resolve();
          }
    }


        deferred.promise.then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            }
            else {
              // authentication failed
              res.status(500).send('Username or password is incorrect');
          }
          })
            .catch(function (err) {
                    res.status(500).send(err);
                });

});

app.listen(3001);
console.log("Listening on http://localhost:3001");
