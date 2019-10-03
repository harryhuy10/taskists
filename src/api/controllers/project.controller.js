const httpStatus = require('http-status');
const { omit } = require('lodash');
const Project = require('../models/project.model.js');
const mongoose = require('mongoose');
exports.create = async (req, res, next) => {
    try {
        
        let project = new Project(req.body);
       
        if (typeof req.body.listUser !== 'undefined') {
            project.listUser = project.listUser.map((q) => mongoose.Types.ObjectId(q))
          }
    
        const savedProject = await project.save();
        res.status(httpStatus.CREATED);
        res.json(savedProject);
      } catch (error) {
        next();
      }
  };
  exports.get = (req, res) => {
        Project.find({listUser:req.payload.id}).then((project) => {
            return res.json({data:project});
        })
  };
  