const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../utils/checkAuth');

const Cart = require('./../schemas/cart');

// get carts
// router.get('/', function(req, res) {
//     Cart
//         .find()
//         .select('custId cartList')
//         .exec()
//         .then(documents => {
//             res.status(200).json(documents);
//         })
//         .catch(error => {
//             res.status(500).json({err: error})
//         });
// });

router.get("/", checkAuth, async (req, res) => {
    const owner = req.Customer._id;
    try {
        const cart = await Cart.findOne({ owner });
    if (cart) {
         res.status(200).send(cart);
    } else {
          res.send(null);
    }
    } catch (error) {
        res.status(500).send();
    }
    });

    router.get("/:id", checkAuth, async (req, res) => {
        const owner = req.params.id;
        try {
            const cart = await Cart.findOne({custId:owner});
            //filter
        if (cart) {
             res.status(200).send(cart);
        } else {
              res.send(null);
        }
        } catch (error) {
            res.status(500).send();
        }
        });

router.get('/full-details', function(req, res) {
    Cart
        .find()
        .populate({
            path: "cartList.productId"
        })
        .exec()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});

// add one cart
router.post('/', function(req, res) { 
    // creating document based on schema
    const cart = new Cart({
        custId: req.body["custId"],
        cartList: req.body["cartList"]
    })

    // save the document to collection
    cart
        .save()
        .then(result => {
            // 201 status for creating records successfully and result is being return
            res.status(201).json(result);
        })
        .catch(error => {
            res.status(500).json({err: error})
        });
});



// delete cart by id
router.delete('/:id', function(req, res) {
    const id = req.params.id;
    Cart
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
    Cart
        .updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).message("Updated");
        })
        .catch(error => {
            res.status(500).json({err: error})
        });

});

module.exports = router;