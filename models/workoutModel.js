const  mongoose  = require("mongoose");

const Schema =mongoose.Schema

const workoutSchema=new Schema({
    title:{
        type: String,
        required:true
    },
    week:
        {
            type: Number,
            required:true
    },
    muscle:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    exercises:[{
        name:{type: String},
        reps:{type: Array},
        weights:{type: Array}
    }],
   
},{ timestamps:true})

const workoutTemplateSchema=new Schema({
    templateName:{
        type: String,
        required:true
    },
    muscle:{
        type:String,
        required:true
    },
    workouts:[{
        name:{type: String},
        sets:{type: Number},
    }],
    email:{
        type:String,
        required:true
    }
   
},{ timestamps:true})


//module.exports=mongoose.model('workoutTemplates', workoutTemplateSchema);
module.exports=mongoose.model('workouts', workoutSchema);