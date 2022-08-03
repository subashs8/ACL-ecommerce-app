const mongoose = require('mongoose');
const schema = mongoose.schema;

var employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	empName: String,
    empId: {type: Number, default: 0000},
});

module.exports = mongoose.model('Employee', employeeSchema);
