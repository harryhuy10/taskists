const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

const _status = ['pending', 'done'];
/**
 * Project Schema
 * @private
 */
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  listUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  picture: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: _status,
    default: 'pending',
  },
  totalTask:{
      type: Number
  },
  didTime:{
      type: Number
  },
  listTask:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true,
});


/**

 * - validations
 
 */
projectSchema.statics = {

}

module.exports = mongoose.model('Project', projectSchema);