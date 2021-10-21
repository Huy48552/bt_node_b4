const httpStatus = require('http-status');
const { Works_for } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a works_for
 * @param {Object} works_forBody
 * @returns {Promise<Works_for>}
 */
const createWorks_for = async (works_forBody) => {
  if (await Works_for.isEmailTaken(works_forBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Works_for.create(works_forBody);
};

/**
 * Query for works_fors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWorks_fors = async (filter, options) => {
  const works_fors = await Works_for.paginate(filter, options);
  return works_fors;
};

/**
 * Get works_for by id
 * @param {ObjectId} id
 * @returns {Promise<Works_for>}
 */
const getWorks_forById = async (id) => {
  return Works_for.findById(id);
};

/**
 * Get works_for by email
 * @param {string} email
 * @returns {Promise<Works_for>}
 */
const getWorks_forByEmail = async (email) => {
  return Works_for.findOne({ email });
};

/**
 * Update works_for by id
 * @param {ObjectId} works_forId
 * @param {Object} updateBody
 * @returns {Promise<Works_for>}
 */
const updateWorks_forById = async (works_forId, updateBody) => {
  const works_for = await getWorks_forById(works_forId);
  if (!works_for) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Works_for not found');
  }
  if (updateBody.email && (await Works_for.isEmailTaken(updateBody.email, works_forId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(works_for, updateBody);
  await works_for.save();
  return works_for;
};

/**
 * Delete works_for by id
 * @param {ObjectId} works_forId
 * @returns {Promise<Works_for>}
 */
const deleteWorks_forById = async (works_forId) => {
  const works_for = await getWorks_forById(works_forId);
  if (!works_for) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Works_for not found');
  }
  await works_for.remove();
  return works_for;
};

module.exports = {
  createWorks_for,
  queryWorks_fors,
  getWorks_forById,
  getWorks_forByEmail,
  updateWorks_forById,
  deleteWorks_forById,
};
