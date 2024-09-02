import fs from "fs";
import { Restaurant } from "../models/restaurant.js";
import { Location } from "../models/location.js";
import { Rating } from "../models/rating.js";
import { Cuisine } from "../models/cuisine.js";
import { Country } from "../models/country.js";

export const addDataToDB = async (fileLocation) => {
    console.log(fileLocation);
    const jsonData = JSON.parse(fs.readFileSync(fileLocation, "utf8"));

    for (const data of jsonData) {
        if (data.restaurants && Array.isArray(data.restaurants)) {
            for (const rest of data.restaurants) {
                if (rest.restaurant) {
                    const {
                        name,
                        id,
                        location,
                        switch_to_order_menu,
                        cuisines,
                        average_cost_for_two,
                        price_range,
                        currency,
                        user_rating,
                        featured_image,
                        has_online_delivery,
                        is_delivering_now,
                        has_table_booking,
                    } = rest.restaurant;

                    const menuUrl = rest.restaurant.menu_url || "";
                    const bookUrl = rest.restaurant.book_url || "";
                    const photosUrl = rest.restaurant.photos_url || "";

                    try {
                        const existingRestaurant = await Restaurant.findOne({ restaurantId: id });
                        if (!existingRestaurant) {
                            const country = await Country.findOne({ countryId: +location.country_id });

                            if (!country) {
                                console.error(`Country with ID ${location.country_id} not found.`);
                                continue;
                            }

                            const newLocation = new Location({
                                ...location,
                                latitude: Number(location.latitude),
                                longitude: Number(location.longitude),
                                country_id: country._id,
                            });

                            const savedLocation = await newLocation.save();
                            if (!savedLocation) {
                                console.error(`Failed to save location for restaurant ID ${id}.`);
                                continue;
                            }

                            const newRating = new Rating({
                                ...user_rating,
                                aggregate_rating: +user_rating.aggregate_rating,
                                votes: +user_rating.votes,
                            });

                            const savedRating = await newRating.save();
                            if (!savedRating) {
                                console.error(`Failed to save rating for restaurant ID ${id}.`);
                                continue;
                            }

                            const cuisinesArray = cuisines.split(",").map((cuisine) => cuisine.trim());
                            let cuisineIds = [];

                            for (const cuisine of cuisinesArray) {
                                try {
                                    const result = await Cuisine.findOneAndUpdate(
                                        { cuisineName: cuisine }, // Query condition
                                        { $setOnInsert: { cuisineName: cuisine } }, // Update or insert
                                        { upsert: true, new: true } // Upsert option and return the new document
                                    );
                                    cuisineIds.push(result._id);
                                } catch (err) {
                                    console.error(`Error processing cuisine "${cuisine}":`, err);
                                }
                            }

                            // Check if all necessary fields are created successfully
                            if (savedLocation && savedRating) {
                                const restaurant = new Restaurant({
                                    restaurantId: id,
                                    name,
                                    location: savedLocation._id,
                                    imageUrl: featured_image,
                                    cuisines: cuisineIds,
                                    switch_to_order_menu: switch_to_order_menu === 1,
                                    has_table_booking: has_table_booking === 1,
                                    has_online_delivery: has_online_delivery === 1,
                                    is_delivering_now: is_delivering_now === 1,
                                    price_range,
                                    average_cost_for_two,
                                    currency,
                                    rating: savedRating._id,
                                    menuUrl,
                                    bookUrl,
                                    photosUrl,
                                });

                                await restaurant.save();
                            } else {
                                console.error(`Failed to create restaurant with ID ${id} due to missing data.`);
                            }
                        }
                    } catch (err) {
                        console.error(`Error processing restaurant ID ${id}:`, err);
                    }
                }
            }
        }
    }
};


export const addCountryToDB = async(fileLocation) => {
    const jsonData = JSON.parse(fs.readFileSync(fileLocation, "utf8"));

    for(const data of jsonData){
        const {country_code, country_name} = data

        try{
            await Country.findOneAndUpdate(
                { countryId: country_code }, // Filter criteria
                { countryName: country_name }, // Data to update
                { upsert: true, new: true }    // Options: create if doesn't exist, return the new document
            );
            // console.log(`Upserted: ${country_name}`);
        } catch(err){
            console.error(err);
        }
    }
}
