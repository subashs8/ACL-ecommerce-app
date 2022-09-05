const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = "acl_internship";

router.get('/', function (req, res) {
    User.find().exec()
        .then(documents => {
            res.status(200).json(documents);
        }).catch(error => {
            res.status(500).json({ err: error })
        });
});

router.post('/signup', function (req, res, next) {
    User.find({ mail: req.body["mail"] }).exec()
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
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body["name"],
                            mail: req.body["mail"],
                            password: hashedPassword,
                            gender: req.body["gender"],
                            DOB: req.body["DOB"],
                        })

                        user.save()
                            .then(result => {
                                res.status(201).json({ message: "User Created" });
                            }).catch(error => {
                                res.status(500).json({ err: error })
                            });
                    }
                });
            }
        });
});

router.post("/login", (req, res, next) => {
    User.find({ mail: req.body.mail })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                mail: user[0].mail,
                userId: user[0]._id
              },
              jwtKey,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;