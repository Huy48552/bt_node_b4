const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const studentSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    Department: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

/**
 * @typedef student
 */
const student = mongoose.model('student', studentSchema);

module.exports = student;
