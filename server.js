require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose=require('mongoose')
const bodyParser = require('body-parser');

const workoutroutes=require('./routes/workout')
const workoutTemplatesRoutes=require('./routes/workoutTemplate')
const paymentroutes=require('./routes/payment')

// const corsOptions = {
//     origin: '*', // Allow all origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: true, // Allow credentials
//   };

const app=express()
app.use(cors());

app.use((req,res,next)=>{
console.log(req.path,req.method)
next()
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/workouts',workoutroutes)
app.use('/workoutTemplates',workoutTemplatesRoutes)
app.use('/payments',paymentroutes)

//connect to db
mongoose.connect(process.env.URI)


.then(()=>{
    app.listen(3000,()=>{
        console.log("Connected to DB Server listening at port 3000")
    })
}) 
.catch((err)=>{
    console.log(err)
})

