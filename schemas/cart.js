const mongoose = require('mongoose');
const schema = mongoose.schema;

var cartSchema = mongoose.Schema({
    custId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
	cartList: [{productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    selectedSize: {type: String, 
        required: true,
        lowercase: true,
        enum: ['small', 'medium', 'large']}}]
});

module.exports = mongoose.model('Cart', cartSchema);
