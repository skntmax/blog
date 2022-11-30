import express from 'express'
import path from 'path'
import { connectDB } from './database_connection/connection.js'
const app = express()
import dotenv from 'dotenv'
import { config } from 'process'
import cors from 'cors'
import bodyParser from 'body-parser'
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

dotenv.config({path:'config.env'})
const PORT = process.env.PORT
app.use(cors())
import router from './routes/router.js'
app.use('/',router)
app.listen(PORT,(err)=>{
    if(err) console.log("Error in running server")
    else {
        console.log("Server is up and running on PORT ",process.env.PORT);
        console.log(`Launch in browser by clicking  here http://localhost:${PORT}`);
    }  
})
connectDB();