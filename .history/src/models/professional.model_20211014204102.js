const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const professionalSchema = mongoose.Schema(
  {
    Degree: {
      type: String,
      required: true,
      trim: true,
    },
    Experience: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
professionalSchema.plugin(toJSON);
professionalSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The professional's email
 * @param {ObjectId} [excludeProfessionalId] - The id of the professional to be excluded
 * @returns {Promise<boolean>}
 */
professionalSchema.statics.isEmailTaken = async function (email, excludeProfessionalId) {
  const professional = await this.findOne({ email, _id: { $ne: excludeProfessionalId } });
  return !!professional;
};

/**
 * Check if password matches the professional's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
professionalSchema.methods.isPasswordMatch = async function (password) {
  const professional = this;
  return bcrypt.compare(password, professional.password);
};

professionalSchema.pre('save', async function (next) {
  const professional = this;
  if (professional.isModified('password')) {
    professional.password = await bcrypt.hash(professional.password, 8);
  }
  next();
});

/**
 * @typedef Professional
 */
const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;
