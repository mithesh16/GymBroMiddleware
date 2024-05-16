const  mongoose  = require("mongoose");

const Schema =mongoose.Schema

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


module.exports=mongoose.model('workoutTemplates', workoutTemplateSchema);