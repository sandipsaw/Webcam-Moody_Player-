require('dotenv').config()
const app = require('./Src/app')
const connectToDB = require('./Src/db/db')

connectToDB()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})