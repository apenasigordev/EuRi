const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const routers = require('./routers');
const session  = require('express-session')
const passport = require('passport');
const Strategy = require('passport-discord.js').Strategy


passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify'];

passport.use(new Strategy({
    clientID: process.env.id,
    clientSecret: process.env.secret,
    callbackURL: '/api/auth/callback',
    scope: scopes,
    prompt: "consent"
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));


routers.forEach(router => {
  app.use(router.path, router.file);
})


app.listen(port, () => {
  // Code.....
})