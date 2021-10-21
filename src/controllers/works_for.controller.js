const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { works_forService } = require('../services');

const createWorks_for = catchAsync(async (req, res) => {
  const works_for = await works_forService.createWorks_for(req.body);
  res.status(httpStatus.CREATED).send(works_for);
});

const getWorks_fors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await works_forService.queryWorks_fors(filter, options);
  res.send(result);
});

const getWorks_for = catchAsync(async (req, res) => {
  const works_for = await works_forService.getWorks_forById(req.params.works_forId);
  if (!works_for) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Works_for not found');
  }
  res.send(works_for);
});

const updateWorks_for = catchAsync(async (req, res) => {
  const works_for = await works_forService.updateWorks_forById(req.params.works_forId, req.body);
  res.send(works_for);
});

const deleteWorks_for = catchAsync(async (req, res) => {
  await works_forService.deleteWorks_forById(req.params.works_forId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWorks_for,
  getWorks_fors,
  getWorks_for,
  updateWorks_for,
  deleteWorks_for,
};
