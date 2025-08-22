const express = require("express")
const songModel = require('./models/Song.model')
const songRoutes = require('./routes/Song.routes')

const app = express()


app.use(express.json())
app.use('/',songRoutes)


module.exports = app;