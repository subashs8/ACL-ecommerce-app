const express = require('express');
const checkAuth = require('../utils/checkAuth');
const router = express.Router();

const employeeController = require('./../controllers/employee');

router.route('/')
    .get(employeeController.getAllData)
    .post(checkAuth, employeeController.saveRecord) // only authorised will be able to post. we can have any logics before calling actual controller with next()

router.get('/full-details', checkAuth, employeeController.getEmployeeFullDetails)

router.route('/:id')
    .get(employeeController.getOneById)
    .delete(employeeController.deleteOneById)

module.exports = router;