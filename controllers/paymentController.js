const express = require('express')
const { default: mongoose } = require('mongoose');


//Function to get all workouts
const makePayment=async(req,res)=>{
const {plan,email}=req.body;
   console.log(plan)
   console.log(email)
}


module.exports={
    makePayment,
}