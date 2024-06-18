const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    }
    catch(err){
        console.log(`Error: ${err.message}`)
    }
}
module.exports = {connectDb}