const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('./../schemas/product');

// get products
router.get('/', function(req, res) {
    Product
        .find()
        .select('_id productName description productType brand price discount gender')
        .sort([['productType', 1], ['brand', 1]]) // for asc and one field .sort('productName') can be used
        // .sort('productType')
        .exec()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});

// get product by id
router.get('/:id', function(req, res) {
    const id = req.params.id;
    Product
        .findById(id)
        .select('_id productName description productType brand price discount gender')
        .exec()
        .then(document => {
            res.status(200).json(document);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});

// add one product
router.post('/', function(req, res) { 
    // creating document based on schema
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        productName: req.body["productName"],
        description: req.body["description"],
        productType: req.body["productType"],
        brand: req.body["brand"],
        price: req.body["price"],
        discount: req.body["discount"],
        gender: req.body["gender"]
    })

    // save the document to collection
    product
        .save()
        .then(result => {
            // 201 status for creating records successfully and result is being return
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});

// delete product by id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Product
        .deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(`${id} document deleted succefully from the collection`);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});

// update - patch
router.patch('/:id', function(req, res) {
    const id = req.params.id;
    const updateOps = {};
    for (const ops in req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).message("Updated");
        })
        .catch(error => {
            res.status(500).json({err: error})
        });

});

// get products with filter in url
router.get('/brand/:brandName', function(req, res) {
    Product
        .find()
        .where('brand').equals(req.params.brandName)
        .select('_id productName description productType brand price discount gender')
        .exec()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});

module.exports = router;