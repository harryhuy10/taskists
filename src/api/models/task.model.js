const mongoose = require('mongoose');
// const httpStatus = require('http-status');
// const { omitBy, isNil } = require('lodash');
// const APIError = require('../utils/APIError');

const _status = ['todo','pending', 'done'];
/**
 * Task Schema
 * @private
 */
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  assignTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estimateHour: {
    type:Number,
    required: true
  },
  realHour: {
    type:Number
  },
  status: {
    type: String,
    enum: _status,
    default: 'pending',
  },
  parentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
 
}, {
  timestamps: true,
});

/**

 * - validations
 
 */
taskSchema.statics = {

}

module.exports = mongoose.model('Task', taskSchema);
