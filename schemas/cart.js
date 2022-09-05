const mongoose = require('mongoose');
const schema = mongoose.schema;

var cartSchema = mongoose.Schema({
    _id: {},
    custId: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
	cartList: [{productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}}]
});

module.exports = mongoose.model('Cart', cartSchema);
