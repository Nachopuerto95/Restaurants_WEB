const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("../data/categories.json");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    icon: {
      type: String
    },
    icon_background_color: {
      type: String
    },
    rating: {
      type: String
    },
    types: {
      type: [String]
    },
    photos: {
      type: [Object]
    },
    website: {
      type: String
    },
    category: {
      type: [String],
      enum: categories,
      required: "Category is required",
      default: []
    },
    formatted_phone_number: {
      type: String
    },
    reviews: {
      type: [Object]
    },
    vicinity: {
      type: String,
      required: "Address is required",
    },
    price_level: {
      type: Number
    },
    user_ratings_total: {
      type: Number
    },
    place_id: {
      type: String
    },
    formatted_address: {
      type: String
    },
    opening_hours: {
      type: Object
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.location = ret.location.coordinates.reverse();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

restaurantSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
