const User = require('../models/user.model');
const mongoose = require('mongoose');


module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).json(err.errors)
            } else {
                next(err)
            }
        })
}   