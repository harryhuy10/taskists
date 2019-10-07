const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Task = require('../models/task.model');
const Project = require('../models/project.model');
const mongoose = require('mongoose');
exports.create = async (req, res, next) => {
    try {
        
        let task = new Task(req.body);
        task.assignTo = mongoose.Types.ObjectId(req.body.assignTo);
        task.assignFrom = mongoose.Types.ObjectId(req.user._id);
        const savedTask = await task.save();
        res.status(httpStatus.CREATED);
        res.json(savedTask);
      } catch (error) {
        next();
      }
  };
exports.get = (req, res) => {
    Task.find({assignTo:req.user._id}).then((task) => {
        return res.json({data:task});
    })
};

exports.update = (req, res) => {
  Task.findById(req.params.id).then((task) => {
      task = req.body;
      task.assignTo = mongoose.Types.ObjectId(req.body.assignTo);
      task.assignFrom = mongoose.Types.ObjectId(req.user._id);
      Project.findById(req.body.projectId).then((project) => {
        project.listTask.push(mongoose.Types.ObjectId(task._id))
        project.save().then(() => {
          return res.json({data:task});
        })
      })
      
  })
};
exports.remove = (req, res) => {
   Task.findByIdAndRemove(req.params.id).then((task) => {
     res.json({task});
   })
}