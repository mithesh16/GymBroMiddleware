const express = require('express')
const workouts=require('../models/workoutModel');
const { default: mongoose } = require('mongoose');


//Function to get all workouts
const getAllWorkouts=async(req,res)=>{

    const user_email=req.query.email
    try{
        const allworkouts=await workouts.find({email:user_email}).sort({createdAt: -1})
        res.status(200).json(allworkouts);
    }
    catch(err){
        res.status(400).json({error:err.message})
}
}
//Function to get single workout
const getWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ID not valid"});
    }
        const workout=await workouts.findById(id)
        if(!workout){
        return res.status(404).json({error:"No Workout found"})
        }
        
         res.status(200).json(workout);
}

//Function to create new workout
const createWorkout=async(req,res)=>{

    const {title,week,muscle,exercises,email}=req.body
    try{
        const newWorkout=await workouts.create({title,week,muscle,email,exercises})
        res.status(200).json(newWorkout);
    }
    catch(err){
                console.log(err)
                res.status(400).json({error:err.message})
    }

}

//Function to update workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params;
    const newWorkout=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ID not valid"});
    }
    try{
        const workout = await workouts.findOneAndUpdate(
            { _id: id },
            newWorkout,
            { new: true } // This option ensures that the returned document is the updated one
        );

        console.log(newWorkout);
        console.log(workout);
        if(!workout){
            return res.status(404).json({error:"No Workout found"})
            }
            
             res.status(200).json(workout);
    }
    catch(err){
                res.status(400).json({error:err.message})
    }
}


//Function to delete a workout
const deleteWorkout=async(req,res)=>{
    const id= req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Not valid")
        return res.status(404).json({error:"ID not valid"});
    }
    try{
        console.log("Hi")
        const workout=await workouts.findOneAndDelete({_id: id})
        res.status(200).json(workout);
    }
    catch(err){
                res.status(400).json({error:err.message})
    }

}

module.exports={
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}