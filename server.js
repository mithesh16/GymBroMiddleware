require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose=require('mongoose')
const bodyParser = require('body-parser');

const workoutroutes=require('./routes/workout')
const workoutTemplatesRoutes=require('./routes/workoutTemplate')

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

//connect to db
mongoose.connect(process.env.URI)

.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Connected to DB Server listening at port 3000")
    })
}) 
.catch((err)=>{
    console.log(err)
})

