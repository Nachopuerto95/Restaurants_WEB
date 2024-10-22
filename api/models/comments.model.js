const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
