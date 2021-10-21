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
companiesSchema.plugin(toJSON);
companiesSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The companies's email
 * @param {ObjectId} [excludeCompaniesId] - The id of the companies to be excluded
 * @returns {Promise<boolean>}
 */
companiesSchema.statics.isEmailTaken = async function (email, excludeCompaniesId) {
  const companies = await this.findOne({ email, _id: { $ne: excludeCompaniesId } });
  return !!companies;
};

/**
 * Check if password matches the companies's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
companiesSchema.methods.isPasswordMatch = async function (password) {
  const companies = this;
  return bcrypt.compare(password, companies.password);
};

companiesSchema.pre('save', async function (next) {
  const companies = this;
  if (companies.isModified('password')) {
    companies.password = await bcrypt.hash(companies.password, 8);
  }
  next();
});

/**
 * @typedef Companies
 */
const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
