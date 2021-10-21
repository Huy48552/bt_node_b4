const httpStatus = require('http-status');
const { Classs } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a classs
 * @param {Object} classsBody
 * @returns {Promise<Classs>}
 */
const createClasss = async (classsBody) => {
  return Classs.create(classsBody);
};
/**
 * Query for classss
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum nu mber of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClassss = async (filter, options) => {
  const classss = await Classs.paginate(filter, options);
  return classss;
};

module.exports = {
  createClasss,
  queryClassss,
};
