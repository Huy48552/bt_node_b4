const express = require('express');
const studentController = require('../../controllers/student.controller');


const router = express.Router();

router
  .route('/')
  .post(studentController.createStudent)
  .get(studentController.getStudents);
router
  .route('/:studentId')
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);


module.exports = router;
