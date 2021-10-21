const httpStatus = require('http-status'); 
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const createStudent = async (studentBody) => {
  return Student.create(studentBody);
};
/**
 * Query for students
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum nu mber of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStudents = async (filter, options) => {
  const students = await Student.paginate(filter, options);
  return students;
};

module.exports = {
  createStudent,
  queryStudents,
};
