const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
var mongoose = require('mongoose');
mongoose.Promise;
mongoose.connect('mongodb://localhost:27017/edx-course-db', { useNewUrlParser: true });

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

const Account = mongoose.model('account',
  {
    name: String,
    balance: Number,
  },
);

app.get('/accounts', (req, res, next) => {
  Account.find(function(err) {
    if(err) return console.error(err);
    console.log(`Account: ${account}`);
    res.send(account);
  });
});

app.post('/accounts', (req, res) => {
  var newAccount = new Account(req.body);
  newAccount.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('The account is saved:', newAccount.toJSON());
      res.send("Account added");
    }
  });
});

app.put('/accounts/:id', (req, res) => {
  var conditions = {_id: req.params.id};
  var options = {multi: false};
  Account.update(conditions, req.body, options, (error, results) => {
    if(error) return console.error(error)
    res.send(results);
  });
});

app.delete('/accounts/:id', (req, res) => {
  var conditions = {_id: req.params.id};
  Account.remove(conditions, (err, results) => {
    if(err) return console.error(err);
    res.send(results);
  });
});

app.use(errorHandler());
const port = 3200;
app.listen(port);