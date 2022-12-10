const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get("/", (req,res) => {
  res.status(200).send({
    message: "API Funcionando"
  })
})

router.get("/login", passport.authenticate('discord.js'), (req,res) => {
});

router.get("/auth/callback", passport.authenticate('discord.js', { failureRedirect: '/' }), (req,res) => {
  res.render("callback.ejs", {
    req, res
  })
})

router.get("/auth/info", (req,res) => {
  res.json(req.user)
})

module.exports = router;