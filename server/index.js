const express = require('express')
require('dotenv').config()
const userRouter = require('./routes/user.routes')
const companyRouter = require('./routes/company.routes')
const corsMiddleWare = require('./middleware/cors.middleware')

const PORT = process.env.PORT

const app = express()
app.use(corsMiddleWare)
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', companyRouter)

const start = ()=>{
    try{
        app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}...`)})
    } catch(err){
        console.log(err)
    }
}

start()