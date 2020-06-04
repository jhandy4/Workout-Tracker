const express = require("express");
// const Exercise = require("../models/exercise.js");
module.exports = function (app) {
  const Workout = require("../models/workout.js");


app.get("/api/workouts", (req, res) => {
    Workout.find({})
      // .populate("exercises")
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

app.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

app.put("/api/workouts/:id", ({body, params}, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true})
    .then(dbWorkout => {
      res.json(dbWorkout);
    // Exercise.findOneAndUpdate(
    //     {_id: req.params.id},
    //     // {$push: {exercises: _id}},
    //     {$push: {exercise: req.body.Exercise}},
    //     {new: true}
    //     .then(dbWorkout => {
            // res.json(dbWorkout);
          })
          .catch ( err => {
            res.status(402).json(err);
          });
      });

app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(403).json(err);
    });
});      
}


