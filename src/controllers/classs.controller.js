const httpStatus = require('http-status');
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync');
const { classsService } = require('../services');

const createClasss = catchAsync(async (req, res) => {
  const classs = await classsService.createClasss(req.body);
  res.status(httpStatus.CREATED).send(classs);
});

const getClassss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classsService.queryClassss(filter, options);
  res.send(result);
});


const getClasss = catchAsync(async (req, res) => {
  const classs = await classsService.getClasssById(req.params.classsId);
  if (!classs) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classs not found');
  }
  res.send(classs);
});

const updateClasss = catchAsync(async (req, res) => {
  const classs = await classsService.updateClasssById(req.params.classsId, req.body);
  res.send(classs);
});

const deleteClasss = catchAsync(async (req, res) => {
  await classsService.deleteClasssById(req.params.classsId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClasss,
  getClassss,
  getClasss,
  updateClasss,
  deleteClasss
};
