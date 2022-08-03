const mongoose = require('mongoose');
const schema = mongoose.schema;

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	productName: {type: String, required: true},
    description: {type: String, default: "Made from authentic cotton."},
    productType: {type: String, default: 'Shirt'},
    brand: {type: String, require: true},
    price: {type: Number, require: true},
    discount: {
        type: Boolean, 
        required: true
    },
    gender: {
        type: String, 
        required: true,
        lowercase: true,
        enum: ['male', 'female'],
        message: '{VALUE} is not a valid gender'
    }
    // new release,
    // size: {

    // }

});

module.exports = mongoose.model('Product', productSchema);
