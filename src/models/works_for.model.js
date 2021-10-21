const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const works_forSchema = mongoose.Schema(
  {
    DOJ: {
      type: String,
      required: true,
      trim: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
works_forSchema.plugin(toJSON);
works_forSchema.plugin(paginate);

/**
 * @typedef Works_for
 */
const Works_for = mongoose.model('Works_for', works_forSchema);

module.exports = Works_for;
