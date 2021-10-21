const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const studentRoute = require('./student.route');
const classsRoute = require('./classs.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const peopleRoute = require('./people.route');
const professionalRoute = require('./professional.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/class',
    route: classsRoute,
  },
  {
    path: '/people',
    route: peopleRoute,
  },
  {
    path: '/professional',
    route: professionalRoute,
  },
  {
    path: '/works',
    route: worksRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
