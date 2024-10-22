const Comment = require('../models/comments.model');
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant.model');

module.exports.list = (req, res, next) => {
    Comment.find({
        restaurant: req.params.id
    })
    .populate('restaurant')
    .populate('author')
    .then((comments) => {
        res.json(comments);
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {

    Restaurant.findById(req.params.id)
        .then((restaurant) => {
            if (restaurant) {
                Comment.create({
                    ...req.body,
                    restaurant: req.params.id,
                    author: req.user.id
               })
                .then((comment) => {
                   res.json(comment);
                })
                .catch(err => {
                   if (err instanceof mongoose.Error.ValidationError) {
                       res.status(400).json(err.errors);
                   } else {
                       next(err);
                   }
               })
            } else {
                res.status(404).json({message: "Restaurant not found"});
            }
        })
        .catch(next);
}