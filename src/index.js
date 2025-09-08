// require('dotenv').config({path: './env'})

import dotenv from 'dotenv'

import express from "express"

import connectDB from "./db/index.js";

dotenv.config(
    {
        path:'./env'
    }
)

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server running on port:${process.env.PORT}`);
        
    } )
})
.catch( (error) => {
    console.log(`ERROR! Connection failed.`)
})














//FIRst Approach for connection
/*const app = express()
( async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`) 
       app.on("error", (error) => {
        console.log("ERROR:", error)
        throw error
       } ) 

       app.listen(process.env.PORT, () => {`Server is listening on port ${process.env.PORT}`})
    } catch (error) {
        console.log(error);
        throw error
    }
} )()
*/    