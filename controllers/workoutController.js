const express = require('express')
const workout=require('../models/workoutModel');
const { default: mongoose } = require('mongoose');


//Function to get all workouts
const getAllWorkouts=async(req,res)=>{
    console.log("hello")
    try{
        const workouts=await workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts);
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
        const workout=await workout.findById(id)
        if(!workout){
        return res.status(404).json({error:"No Workout found"})
        }
        
         res.status(200).json(workout);
}

//Function to create new workout
const createWorkout=async(req,res)=>{
    const {title,week,muscle,workouts,email}=req.body

    try{
        const newWorkout=await workout.Create({title,week,muscle,workouts,email})
        res.status(200).json(newWorkout);
    }
    catch(err){
                res.status(400).json({error:err.message})
    }

}

//Function to update workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ID not valid"});
    }
    try{
        const workout=await workout.findOneAndUpdate({_id:id},{
            ...req.body
        })
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
    const id= parseInt(req.params.id)
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Not valid")
        return res.status(404).json({error:"ID not valid"});
    }
    try{
        console.log("Hi")
        const workout=await workout.findOneAndDelete({_id: id})
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