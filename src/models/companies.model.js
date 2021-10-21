const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const companiesSchema = mongoose.Schema(
  {
    CName: {
      type: String,
      required: true,
      trim: true,
    },
    Address: {
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
companiesSchema.plugin(toJSON);
companiesSchema.plugin(paginate);

/**
 * @typedef Companies
 */
const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
