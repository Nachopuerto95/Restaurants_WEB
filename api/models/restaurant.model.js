const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../data/categories.json')

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Name is required'
        },
        category: {
            type: String,
            enum: categories,
            required: 'Category is required'
        },
        tables: {
            type: Number,
            min: [0, 'Minimum number of tables is 0'],
            max: [100, 'Maximum number of tables is 0'],
        
        },
        avgPrice: {
            type: Number,
        },
        address:{
            type: String,
            required: 'Address is required'
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

restaurantSchema.index({location : '2dsphere'})

restaurantSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: "restaurant",
    justOne: false
})

module.exports = mongoose.model('Restaurant', restaurantSchema);