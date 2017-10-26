const path = require('path');
const rootPath = path.normalize(__dirname);

const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');
const passport=require('passport');
const session = require('express-session');
const config=require('./config')
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const User=require('./models/users');
var app=express();

const connection = mongoose.createConnection(config.db.mongo.url);
app.use(bodyParser.json());

app.use(session({
    secret: config.db.mongo.sessionSecret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection })
}));


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Passport Configuration
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
require('./router')(app,passport);
var server=http.createServer(app);
server.listen('5000',function () {

    console.log('server is running');
})
