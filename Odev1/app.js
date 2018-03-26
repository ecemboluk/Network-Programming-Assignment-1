var express = require('express');
var path = require('path');
var cors = require('cors');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    res.send(text);
   });
});


app.post('/', function(req, res) {
    if(req.body.tip=="choose"){
        MongoClient.connect(url, function(err, db) {
            var data;
            if (err) throw err;
            var dbo = db.db("odevdb");
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                res.send(data);
                db.close();
            });
        });
    }
    else if(req.body.tip=="kodu"){
        MongoClient.connect(url, function(err, db) {
            var data;
            if (err) throw err;
            var dbo = db.db("odevdb");
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                var myquery = { code: data.kod, name: data.isim, content:data.icerik};
                var newvalues = { $set: {code: req.body.kod, name:req.body.isim, content:req.body.icerik } };
                dbo.collection("dersler").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                });
                db.close();
            });
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                res.send(data);
                db.close();
            });
            
        });
    }
    else if(req.body.tip=="isim"){
        MongoClient.connect(url, function(err, db) {
            var data;
            if (err) throw err;
            var dbo = db.db("odevdb");
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                var myquery = { code: data.kod, name: data.isim, content:data.icerik};
                var newvalues = { $set: {code: req.body.kod, name:req.body.isim, content:req.body.icerik } };
                dbo.collection("dersler").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                });
                db.close();
            });
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                res.send(data);
                db.close();
            });
        });
    }
    else if(req.body.tip=="icerik"){
        MongoClient.connect(url, function(err, db) {
            var data;
            if (err) throw err;
            var dbo = db.db("odevdb");
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                var myquery = { code: data.kod, name: data.isim, content:data.icerik};
                var newvalues = { $set: {code: req.body.kod, name:req.body.isim, content:req.body.icerik } };
                dbo.collection("dersler").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                });
                db.close();
            });
        });
    }
    else if(req.body.tip=="JSON"){
        MongoClient.connect(url, function(err, db) {
            var data;
            if (err) throw err;
            var dbo = db.db("odevdb");
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.send(data);
                db.close();
            });
        });
    }
    else if(req.body.tip=="XML"){
        MongoClient.connect(url, function(err, db) {
            var data;
            if (err) throw err;
            var dbo = db.db("odevdb");
            dbo.collection("dersler").findOne({}, function(err, result) {
                if (err) throw err;
                data={
                    kod:result.code,
                    isim:result.name,
                    icerik:result.content
                }
                var builder = require('xmlbuilder');
                var xml = builder.create('dersler')
                    .ele('bilgiler')
                    .ele(data)
                    .end({ pretty: true});
                res.send(xml);
                db.close();
            });
        });
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




