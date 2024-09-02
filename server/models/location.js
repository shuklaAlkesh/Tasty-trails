import mongoose, { Schema, model, Types } from "mongoose";
import { Country } from "./country.js";

const LocationSchema = new Schema({
    latitude: { type: Number },
    address: { type: String },
    city: { type: String },
    country_id: { type: Types.ObjectId, ref: "Country" },
    locality_verbose: { type: String },
    city_id: { type: Number },
    zipcode: { type: String },
    longitude: { type: Number },
    locality: { type: String },
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere", // Adding geospatial index
    },
});

LocationSchema.pre("save", function (next) {
    this.coordinates = [parseFloat(this.longitude), parseFloat(this.latitude)];
    next();
});

export const Location =
    mongoose.models.Location || model("Location", LocationSchema);
