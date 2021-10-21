const httpStatus = require('http-status');
const { Professional } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a professional
 * @param {Object} professionalBody
 * @returns {Promise<Professional>}
 */
const createProfessional = async (professionalBody) => {
  return Professional.create(professionalBody);
};

/**
 * Query for professionals
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProfessionals = async (filter, options) => {
  const professionals = await Professional.paginate(filter, options);
  return professionals;
};

/**
 * Get professional by id
 * @param {ObjectId} id
 * @returns {Promise<Professional>}
 */
const getProfessionalById = async (id) => {
  return Professional.findById(id);
};

/**
 * Get professional by email
 * @param {string} email
 * @returns {Promise<Professional>}
 */
const getProfessionalByEmail = async (email) => {
  return Professional.findOne({ email });
};

/**
 * Update professional by id
 * @param {ObjectId} professionalId
 * @param {Object} updateBody
 * @returns {Promise<Professional>}
 */
const updateProfessionalById = async (professionalId, updateBody) => {
  const professional = await getProfessionalById(professionalId);
  if (!professional) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Professional not found');
  }
  if (updateBody.email && (await Professional.isEmailTaken(updateBody.email, professionalId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(professional, updateBody);
  await professional.save();
  return professional;
};

/**
 * Delete professional by id
 * @param {ObjectId} professionalId
 * @returns {Promise<Professional>}
 */
const deleteProfessionalById = async (professionalId) => {
  const professional = await getProfessionalById(professionalId);
  if (!professional) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Professional not found');
  }
  await professional.remove();
  return professional;
};

module.exports = {
  createProfessional,
  queryProfessionals,
  getProfessionalById,
  getProfessionalByEmail,
  updateProfessionalById,
  deleteProfessionalById,
};
