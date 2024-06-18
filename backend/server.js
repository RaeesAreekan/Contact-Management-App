const express = require("express")
const {connectDb} = require('./config/dbConnection')
const { errorHandler } = require("./middleware/errorHandler")
const env = require('dotenv').config()
const app = express()
connectDb()
const port = process.env.PORT 
app.use(express.json())
app.use(errorHandler)
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})