const httpStatus = require('http-status');
const { omit } = require('lodash');
const Task = require('../models/task.model.js');
const mongoose = require('mongoose');
exports.create = async (req, res, next) => {
    try {
        
        let task = new Task(req.body);
       
       
        task.assignTo = mongoose.Types.ObjectId(req.body.assignTo)
        task.assignFrom = mongoose.Types.ObjectId(req.user._id)
        const savedTask = await task.save();
        res.status(httpStatus.CREATED);
        res.json(savedTask);
      } catch (error) {
        next();
      }
  };

 