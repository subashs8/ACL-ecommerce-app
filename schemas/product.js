const mongoose = require('mongoose');
const schema = mongoose.schema;

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	productName: {type: String, required: true},
    description: {type: String, default: "LEGO set"},
    productType: {type: String, default: 'Technic'},
    price: {type: Number, require: true},
    discount: {
        type: Boolean, 
        required: true
    }
    // new release,

});

module.exports = mongoose.model('Product', productSchema);
