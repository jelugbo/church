var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var events = require('./routes/event');

var mongoose = require('mongoose');
// var mongoose2 = require('mongoose');


// Handler to permit Access-Control-Allow-Origin
var cors = require('cors');

var app = express();
app.use(cors());

//var app = express();

mongoose.connection.close();
// mongoose2.connection.close();


 // mongoose.model('./models/event')
// mongoose2.connect('mongodb://localhost/event');
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'mecs',
  pass: 'mecs'
}

 var uri ='mongodb://127.0.0.1:27017/ChurchApp'; //,mongodb://localhost/event
// mongoose.connect(uri);

// mongoose.connect('mongodb://localhost/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

if ('development'==app.get('env')){
    app.use(express.errorHandler());
    mongoose.connect(uri );
}
// app.model('/users',funcion())

mongoose.connection.once('connected', function() {
  console.log("Connected to database")
});

app.get('/', routes.index);
// app.get('/users', users.list);
app.get('/users', users.index);
app.get('/users/:id',users.show);

app.post('/user', users.create);
app.post ('/auth' , users.auth);

app.del('/users',users.delete);

app.put('/users', users.update);

// event Section

app.get('/events', events.index);
app.get('/events/:id',events.show);
app.post('/event', events.create);
app.del('/events', events.delete);
app.put('/events', events.update);


app.get('/sessionFinder/:id',users.sfinder);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});




// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(3000);


module.exports = app;
