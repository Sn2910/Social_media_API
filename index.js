const express = require('express')
require('dotenv').config()
const cors =require('cors')
const mongoose = require('mongoose');
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute =require('./routes/users')
const authRoute =require('./routes/auth')
const postRoute =require('./routes/posts')
const app = express()

app.use(cors())
const port = process.env.PORT || 8000;
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true},()=>console.log("Database connected"))

  //middleware
  app.use(express.json())
  app.use(helmet())
  app.use(morgan("common"))
  app.use("/api/users", userRoute)
  app.use("/api/auth", authRoute)
  app.use("/api/posts", postRoute)



app.listen(port, ()=>console.log('Server Starts at port :' +port))