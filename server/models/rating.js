import mongoose, { Schema, model } from "mongoose";

const RatingSchema = new Schema({
    rating_text: { type: String },
    rating_color: { type: String },
    votes: { type: Number },
    aggregate_rating: { type: Number },
});

export const Rating = mongoose.models.Rating || model("Rating", RatingSchema);