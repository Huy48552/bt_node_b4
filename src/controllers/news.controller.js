const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { newsService } = require('../services');

const createNews = catchAsync(async (req, res) => {
  const news = await newsService.createNews(req.body);
  res.status(httpStatus.CREATED).send(news);
});

const getNewss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await newsService.queryNewss(filter, options);
  res.send(result);
});

module.exports = {
  createNews,
  getNewss,
};
