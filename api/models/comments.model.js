const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        restaurant: {
            type: String,
            ref: "Restaurant",
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
)

module.exports = mongoose.model('Comment', commentSchema);