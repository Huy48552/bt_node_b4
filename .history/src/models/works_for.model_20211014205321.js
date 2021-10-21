const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const works_forSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'works_for',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
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
 * Check if email is taken
 * @param {string} email - The works_for's email
 * @param {ObjectId} [excludeWorks_forId] - The id of the works_for to be excluded
 * @returns {Promise<boolean>}
 */
works_forSchema.statics.isEmailTaken = async function (email, excludeWorks_forId) {
  const works_for = await this.findOne({ email, _id: { $ne: excludeWorks_forId } });
  return !!works_for;
};

/**
 * Check if password matches the works_for's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
works_forSchema.methods.isPasswordMatch = async function (password) {
  const works_for = this;
  return bcrypt.compare(password, works_for.password);
};

works_forSchema.pre('save', async function (next) {
  const works_for = this;
  if (works_for.isModified('password')) {
    works_for.password = await bcrypt.hash(works_for.password, 8);
  }
  next();
});

/**
 * @typedef Works_for
 */
const Works_for = mongoose.model('Works_for', works_forSchema);

module.exports = Works_for;
