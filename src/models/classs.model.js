const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numberStudent: {
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
classsSchema.plugin(toJSON);
classsSchema.plugin(paginate);

/**
 * @typedef classs
 */


module.exports = mongoose.model('classs', classsSchema);
