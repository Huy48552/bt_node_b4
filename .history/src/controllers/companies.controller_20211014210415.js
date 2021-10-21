const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companiesService } = require('../services');

const createCompanies = catchAsync(async (req, res) => {
  const companies = await companiesService.createCompanies(req.body);
  res.status(httpStatus.CREATED).send(companies);
});

const getCompaniess = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await companiesService.queryCompaniess(filter, options);
  res.send(result);
});

const getCompanies = catchAsync(async (req, res) => {
  const companies = await companiesService.getCompaniesById(req.params.companiesId);
  if (!companies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Companies not found');
  }
  res.send(companies);
});

const updateCompanies = catchAsync(async (req, res) => {
  const companies = await companiesService.updateCompaniesById(req.params.companiesId, req.body);
  res.send(companies);
});

const deleteCompanies = catchAsync(async (req, res) => {
  await companiesService.deleteCompaniesById(req.params.companiesId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCompanies,
  getCompaniess,
  getCompanies,
  updateCompanies,
  deleteCompanies,
};
