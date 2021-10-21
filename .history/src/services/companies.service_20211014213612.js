const httpStatus = require('http-status');
const { Companies } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a companies
 * @param {Object} companiesBody
 * @returns {Promise<Companies>}
 */
const createCompanies = async (companiesBody) => {
  return Companies.create(companiesBody);
};

/**
 * Query for companiess
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCompaniess = async (filter, options) => {
  const companiess = await Companies.paginate(filter, options);
  return companiess;
};

/**
 * Get companies by id
 * @param {ObjectId} id
 * @returns {Promise<Companies>}
 */
const getCompaniesById = async (id) => {
  return Companies.findById(id);
};

/**
 * Get companies by email
 * @param {string} email
 * @returns {Promise<Companies>}
 */
const getCompaniesByEmail = async (email) => {
  return Companies.findOne({ email });
};

/**
 * Update companies by id
 * @param {ObjectId} companiesId
 * @param {Object} updateBody
 * @returns {Promise<Companies>}
 */
const updateCompaniesById = async (companiesId, updateBody) => {
  const companies = await getCompaniesById(companiesId);
  if (!companies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Companies not found');
  }
  if (updateBody.email && (await Companies.isEmailTaken(updateBody.email, companiesId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(companies, updateBody);
  await companies.save();
  return companies;
};

/**
 * Delete companies by id
 * @param {ObjectId} companiesId
 * @returns {Promise<Companies>}
 */
const deleteCompaniesById = async (companiesId) => {
  const companies = await getCompaniesById(companiesId);
  if (!companies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Companies not found');
  }
  await companies.remove();
  return companies;
};

module.exports = {
  createCompanies,
  queryCompaniess,
  getCompaniesById,
  getCompaniesByEmail,
  updateCompaniesById,
  deleteCompaniesById,
};
