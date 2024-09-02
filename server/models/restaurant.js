import mongoose, { Schema, model, Types } from "mongoose";
import { Location } from "./location.js";
import { Rating } from "./rating.js";
import { Cuisine } from "./cuisine.js";

const RestaurantSchema = new Schema(
    {
        restaurantId:{
            type: Number,
            uqique: true,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        location: {
            type: Types.ObjectId,
            required: true,
            ref: "Location"
        },
        imageUrl: {
            type: String,
        },
        bookUrl: {
            type: String,
        },
        photosUrl: {
            type: String,
        },
        menuUrl: {
            type: String,
        },
        cuisines: [
            {
                type: Types.ObjectId,
                ref: "Cuisine"
            }
        ],
        switch_to_order_menu: {
            type: Boolean,
        },
        has_table_booking: {
            type: Boolean,
        },
        has_online_delivery: {
            type: Boolean,
        },
        is_delivering_now: {
            type: Boolean,
        },
        price_range: {
            type: Number,
        },
        average_cost_for_two: {
            type: Number,
        },
        currency: {
            type: String,
        },
        rating: {
            type: Types.ObjectId,
            required: true,
            ref: "Rating"
        }
    }
)

export const Restaurant = mongoose.models.Restaurant || model("Restaurant", RestaurantSchema);