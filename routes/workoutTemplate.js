const express = require('express')
const router=express.Router()
const workoutTemplates=require('../models/workoutModel')

const {
    createWorkoutTemplate,
    getAllWorkoutTemplates,
    getWorkoutTemplate,
    updateWorkoutTemplate,
    deleteWorkoutTemplate
}
=require('../controllers/workoutTemplate')

//Get all workouts

router.get('/',getAllWorkoutTemplates)

//Get single workouts
router.get('/:id',getWorkoutTemplate)

//Create a new workout
router.post('/',createWorkoutTemplate)

//Delete a workout
router.delete('/:id',deleteWorkoutTemplate)

//Update a workout
router.patch('/:id',updateWorkoutTemplate)

module.exports = router