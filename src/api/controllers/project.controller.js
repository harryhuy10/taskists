const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Project = require('../models/project.model.js');
const mongoose = require('mongoose');

exports.create = async (req, res, next) => {
    try {
        let project = new Project(req.body);
        if (typeof req.body.listUser !== 'undefined') {
            project.listUser = project.listUser.map((q) => mongoose.Types.ObjectId(q));
          }
        project.createdBy = mongoose.Types.ObjectId(req.user._id)
        const savedProject = await project.save();
        res.status(httpStatus.CREATED);
        res.json(savedProject);
      } catch (error) {
        next();
      }
  };

exports.get = (req, res) => {
        Project.find({listUser:req.user._id}).populate({
          path:"createdBy",
          select:"email name"
        }).populate({
          path:"listUser",
          select:"email name"
        }).populate({
          path:"listTask",
          select:"taskName"
        }).then((project) => {
            return res.json({data:project});
        })
  };
  