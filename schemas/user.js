const mongoose = require('mongoose');
const schema = mongoose.schema;

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    mail: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    password: { type: String, required: true },
    gender: {
        type: String, 
        required: true,
        lowercase: true,
        enum: ['male', 'female'],
        message: '{VALUE} is not a valid gender'
    },
    DOB: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
