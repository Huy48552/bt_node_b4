const express = require('express');
const classsController = require('../../controllers/classs.controller');


const router = express.Router();

router
  .route('/')
  .post(classsController.createClasss)
  .get(classsController.getClassss);
router
  .route('/:classsId')
  .get(classsController.getClasss)
  .patch(classsController.updateClasss)
  .delete(classsController.deleteClasss);


module.exports = router;
