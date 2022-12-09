const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const routers = require('./routers');

app.use(express.static("public"));

routers.forEach(router => {
  app.use(router.path, router.file);
})


app.listen(port, () => {
  // Code.....
})