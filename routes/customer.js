const express = require('express');
const router = express.Router();
const Customer = require('../schemas/customer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = "acl_internship";

router.get('/', function (req, res) {
    Customer.find().exec()
        .then(documents => {
            res.status(200).json(documents);
        }).catch(error => {
            res.status(500).json({ err: error })
        });
});

router.post('/signup', function (req, res, next) {
    Customer.find({ mail: req.body["mail"] }).exec()
        .then((documents) => {
            if (documents.length > 0) {
                res.status(404).json({ err: "Already Exisits" });
            } else {
                bcrypt.hash(req.body["password"], 10, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const customer = new Customer({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body["name"],
                            mail: req.body["mail"],
                            password: hashedPassword,
                            gender: req.body["gender"],
                            DOB: req.body["DOB"],
                            // address: req.body["address"]
                        })

                        customer.save()
                            .then(result => {
                                res.status(201).json({ message: "Customer Created" });
                            }).catch(error => {
                                res.status(500).json({ err: error })
                            });
                    }
                });
            }
        });
});

router.post('/login', function (req, res) {
    Customer.findOne({ mail: req.body["mail"] }).exec()
        .then((docs) => {
            if (docs.length > 0) {
                res.status(401).json({ message: "Unauthorized" })
            } else {
                bcrypt.compare(req.body["password"], docs.password, (err, result) => {
                    if (err) {
                        res.status(401).json({ message: "Unauthorized" })
                    } else {
                        const jwtPayload = {
                            customerId: docs._id,
                            email: docs.mail,
                            role: 'Customer Role'
                        };
                        try {
                            const jwtToken = jwt.sign(jwtPayload, jwtKey, { expiresIn: '1h' });
                            return res.status(200).json({ message: "Authorized", token: jwtToken })
                        } catch (error) {
                            return res.status(500).json({ err: error })
                        }
                    }
                })
            }
        })
});

module.exports = router;