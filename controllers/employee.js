const mongoose = require('mongoose');

const Employee = require('./../schemas/employee');

const getAllData = function(req, res) {
    Employee.find().exec()
    .then(documents => {
        res.status(200).json(documents);
    })
    .catch(error => {
        res.status(500).json({err: error})
    });
};

const getEmployeeFullDetails = function(req, res) {
    Employee.find()
    // .populate("projectId", "projectName projectLeadName")
    .exec()
    .then(documents => {
        res.status(200).json(documents);
    })
    .catch(error => {
        res.status(500).json({err: error})
    });
};

const getOneById = function(req, res) {
    const id = req.params.id;
    Employee.findById(id).exec()
    .then(document => {
        res.status(200).json(document);
    }).catch(error => {
        res.status(500).json({err: error})
    });
};

const saveRecord = function(req, res) { 
    const employee = new Employee({
        _id: mongoose.Types.ObjectId(),
        empName: req.body["empName"],
        empId: req.body["empId"]
    })

    employee.save()
    .then(result => {
        res.status(201).json(result);
    }).catch(error => {
        res.status(500).json({err: error})
    });
};

const deleteOneById = function(req, res) {
    const id = req.params.id;
    Employee.deleteOne({_id: id}).exec()
    .then(document => {
        res.status(200).json("Record deleted successfully");
    }).catch(error => {
        res.status(500).json({err: error})
    });
};

module.exports = {
    getAllData, getEmployeeFullDetails, getOneById, saveRecord, deleteOneById
};