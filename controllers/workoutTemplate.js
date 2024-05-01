const express = require('express')

const workoutTemplates=require('../models/workoutModel');
const { default: mongoose } = require('mongoose');


//Function to get all workouts
const getAllWorkoutTemplates=async(req,res)=>{
    const user_email=req.query.email
    console.log(user_email)
    try{
        const workoutTemplatess=await workoutTemplates.find({email:user_email}).sort({createdAt: -1})
        res.status(200).json(workoutTemplatess);
    }
    catch(err){
        res.status(400).json({error:err.message})
}
}
//Function to get single workout
const getWorkoutTemplate=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ID not valid"});
    }
        const workoutTemplate=await workoutTemplates.findById(id)
        if(!workoutTemplate){
        return res.status(404).json({error:"No Workout found"})
        }
        
         res.status(200).json(workoutTemplate);
}

//Function to create new workout
const createWorkoutTemplate=async(req,res)=>{


    const {templateName,muscle,workouts,email}=req.body
    console.log(req.body)
    console.log(workouts)
    try{
        const newWorkoutTemplate=await workoutTemplates.create({templateName,muscle,workouts,email})
        res.status(200).json(newWorkoutTemplate);
    }
    catch(err){
                res.status(400).json({error:err.message})
    }

}

//Function to update workout
const updateWorkoutTemplate=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ID not valid"});
    }
    try{
        const workoutTemplate=await workoutTemplates.findOneAndUpdate({_id:id},{
            ...req.body
        })
        if(!workoutTemplate){
            return res.status(404).json({error:"No Workout Template found"})
            }
            
             res.status(200).json(workoutTemplate);
    }
    catch(err){
                res.status(400).json({error:err.message})
    }
}


//Function to delete a workout
const deleteWorkoutTemplate=async(req,res)=>{
    const {id}=req.params
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"ID not valid"});
    }
    try {
        console.log("Hii");
        const deletedTemplate = await workoutTemplates.findOneAndDelete({ _id: id });
        if (!deletedTemplate) {
            return res.status(404).json({ error: "No Workout Template found" });
        }
        res.status(200).json(deletedTemplate);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
}

module.exports={
    createWorkoutTemplate,
    getAllWorkoutTemplates,
    getWorkoutTemplate,
    deleteWorkoutTemplate,
    updateWorkoutTemplate
}