//imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/register', function(req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = new User({
                _id: new  mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save().then(function(result) {
                console.log(result);
                res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'New user has been created'
                    }
                });
            }).catch(error => {
                res.status(500).json({
                    status: 'error',
                    data: {
                        error: error
                    }
                });
            });
        }
    });
});

router.post('/login', function(req, res){
    User.findOne({email: req.body.email})
        .exec()
        .then(function(user) {
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err) {
                    return res.status(401).json({
                        status: 'error',
                        data: {
                            message: 'Unauthorized Access'
                        }
                    });
                }
                if(result) {
                    const JWTToken = jwt.sign({
                            email: user.email,
                            _id: user._id
                        },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        status: 'success',
                        data: {
                            token: JWTToken
                        }
                    });
                }
                return res.status(401).json({
                    status: 'error',
                    data: {
                        message: 'Unauthorized Access'
                    }
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                status: 'error',
                data: {
                    error: error
                }
            });
        });
});

module.exports = router;