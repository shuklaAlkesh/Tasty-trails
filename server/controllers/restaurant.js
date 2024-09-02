import mongoose from "mongoose";
import { TryCatch } from "../middlewares/error.js";
import { Restaurant } from "../models/restaurant.js";
import { ErrorHandler } from "../utils/utility.js";
import { Location } from "../models/location.js";
import { Cuisine } from "../models/cuisine.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from "path";
import mime from "mime-types";

const API_KEY = "AIzaSyCwOJSh5usJKuX3zb4eOOZAPIvO7VbBvJk";
const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);

export const getRestaurant = TryCatch(async (req, res, next) => {
    const restaurants = await Restaurant.find()
        .populate({
            path: "location",
            populate: {
                path: "country_id",
                model: "Country",
            },
        })
        .populate("cuisines")
        .populate("rating");

    if (restaurants.length === 0) {
        return next(new ErrorHandler("No Restaurants found", 404));
    }

    res.status(200).json({
        success: true,
        restaurants,
    });
});

export const getRestaurantById = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ restaurantId: Number(id) })
        .populate({
            path: "location",
            populate: {
                path: "country_id",
                model: "Country",
            },
        })
        .populate("cuisines")
        .populate("rating");

    if (!restaurant) {
        return next(new ErrorHandler("No Restaurant found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        restaurant,
    });
});

export const getAllRestaurants = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 20; // Default to 10 restaurants per page

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const count = await Restaurant.countDocuments();

        const restaurants = await Restaurant.find({})
            .populate({
                path: "location",
                populate: {
                    path: "country_id",
                    model: "Country",
                },
            })
            .populate("cuisines")
            .populate("rating")
            .limit(limit)
            .skip(startIndex);

        // Pagination Result Object
        const paginationResult = {};

        if (endIndex < count) {
            paginationResult.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            paginationResult.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        paginationResult.current = {
            page: page,
            limit: limit,
        };

        return res.json({
            pagination: paginationResult,
            totalRestaurants: count,
            restaurants: restaurants,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRestaurantWithFilters = async (req, res) => {
    try {
        const { countryId, cuisineId, averageCostForTwo, name } = req.query;

        // Construct the query object dynamically based on the provided filters
        let query = {};
        // console.log("hello");
        
        if (countryId) {
            // Validate the provided countryId
            if (!mongoose.Types.ObjectId.isValid(countryId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid format for countryId",
                });
            }

            // Find locations with the provided countryId
            const locations = await Location.find({ country_id: countryId });

            // Extract the location IDs from the results
            const formattedLocations = locations.map((loc) => loc._id);

            // Update the query to filter restaurants by any of the location IDs
            if (formattedLocations.length > 0) {
                query["location"] = { $in: formattedLocations };
            } else {
                // If no locations are found, return an empty array or handle accordingly
                return res.status(200).json([]);
            }
        }

        if (cuisineId) {
            query["cuisines"] = { $in: [cuisineId] };
        }

        if (averageCostForTwo) {
            query["average_cost_for_two"] = { $lte: Number(averageCostForTwo) };
        }

        if (name) {
            query["name"] = { $regex: name, $options: "i" };
        }

        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 20; // Default to 10 restaurants per page

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const allRest = await Restaurant.find(query)
        const count = allRest.length
        // console.log(count);

        // Find restaurants based on the constructed query
        const restaurants = await Restaurant.find(query)
            .populate({
                path: "location",
                populate: {
                    path: "country_id",
                    model: "Country",
                },
            })
            .populate("cuisines")
            .populate("rating")
            .limit(limit)
            .skip(startIndex);

        
        const paginationResult = {};

        if (endIndex < count) {
            paginationResult.next = {
                page: page + 1,
                limit: limit,
            };
        }

        if (startIndex > 0) {
            paginationResult.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        paginationResult.current = {
            page: page,
            limit: limit,
        };
        // console.log(count);

        return res.json({
            pagination: paginationResult,
            totalRestaurants: count,
            restaurants: restaurants,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching restaurants",
        });
    }
};

export const getRestaurantWithinRadius = async (req, res) => {
    try {
        const { longitude, latitude, radius } = req.query;

        // console.log(longitude, latitude);

        // Find all locations within 3km radius
        const nearbyLocations = await Location.find({
            coordinates: {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(longitude), parseFloat(latitude)],
                        radius / 6378.1,
                    ], // 3 km radius
                },
            },
        });

        // console.log(nearbyLocations);

        if (nearbyLocations.length === 0) {
            return res.json({
                message: "No restaurants found within 3km radius",
            });
        }

        const locationIds = nearbyLocations.map((location) => location._id);

        const restaurants = await Restaurant.find({
            location: { $in: locationIds },
        })
            .populate({
                path: "location",
                populate: {
                    path: "country_id",
                    model: "Country",
                },
            })
            .populate("cuisines")
            .populate("rating");

        return res.json({
            count: restaurants.length,
            restaurants,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

async function analyzeFoodImage(file, prompt) {
    try {
        const mimeType = file.mimetype || "image/jpeg";

        const uploadResponse = await fileManager.uploadFile(file.path, {
            mimeType: mimeType,
            displayName: file.originalname,
        });

        console.log(
            `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
        );

        const getResponse = await fileManager.getFile(uploadResponse.file.name);
        console.log(
            `Retrieved file ${getResponse.displayName} as ${getResponse.uri}`
        );

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: prompt },
        ]);

        return result.response.text();
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to analyze the food image");
    }
}

export const getCuisine = async (req, res) => {
    try {
        const cuisineName = req.name ? req.name.trim().replace(/\s+/g, " ") : "";

        const cuisines = await Cuisine.find({
            cuisineName: cuisineName,
        });

        if (cuisines.length === 0) {
            return res.status(404).json({ message: "Cuisine not found" });
        }

        // Extracting the IDs from the cuisines array
        const cuisineIds = cuisines.map((cuisine) => cuisine._id);

        const restaurants = await Restaurant.find({
            cuisines: { $in: cuisineIds },
        })
            .populate({
                path: "location",
                populate: {
                    path: "country_id",
                    model: "Country",
                },
            })
            .populate("cuisines")
            .populate("rating"); // Assuming you meant to use "user_rating"

        // console.log(restaurants);

        return res
            .status(200)
            .json({ restaurants: restaurants, cuisine: cuisineName });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error occurred while fetching restaurants",
        });
    }
};

export const uploadImage = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
    }

    // writing the promt for the image :

    const prompt = `
Given an image of a food item, predict the cuisine it belongs to from the following list. Just provide the name of the cuisine. Just provide the same cuisine name as given in the following list. Don't include any extra characters in your response:

- Continental
- American
- Asian
- North Indian
- Thai
- European
- Mexican
- Chinese
- Cafe
- Italian
- Finger Food
- Modern Indian
- Mughlai
- Mediterranean
- Fast Food
- South Indian
- Middle Eastern
- Bengali
- Tex-Mex
- Biryani
- Desserts
- Seafood
- Street Food
- Tea
- Bakery
- Burger
- Pizza
- Healthy Food
- Salad
- Beverages
- Japanese
- British
- Spanish
- Greek
- Charcoal Grill
- Indonesian
- North Eastern
- Burmese
- German
- Andhra
- Chettinad
- Goan
- Hyderabadi
- Awadhi
- Arabian
- Lebanese
- Lucknowi
- Ice Cream
- Kerala
- Rajasthani
- Armenian
- Sandwich
- Malaysian
- French
- Maharashtrian
- Malwani
- Portuguese
- African
- Juices
- Tibetan
- Mithai
- Indian
- BBQ
- Cajun
- Vietnamese
- Steak
- Parsi
- Mangalorean
- Gujarati
- Korean
- International
- Fusion
- Turkish
- Singaporean
- Malay
- Western
- Australian
- Cantonese
- Dim Sum
- Pakistani
- Afghani
- Filipino
- Sri Lankan
- Döner
- Bar Food
- Restaurant Cafe
- Börek
- World Cuisine
- Patisserie
- Izgara
- Fresh Fish
- Kebab
- Turkish Pizza
- Coffee and Tea
- Curry
- Taiwanese
- Contemporary
- Sushi
- Ramen
- Grill
- Tapas
- Vegetarian
- South African
- Peruvian
- Latin American
- Brazilian
- Mineira
- Gourmet Fast Food
- Argentine
- Asian Fusion
- Kiwi
- Pub Food
- Fish and Chips
- Sunda
- Peranakan
- Deli
- Belgian
- Durban
- Scottish
- Modern Australian
- Breakfast
- Southwestern
- Bihari
- Naga
- Assamese
- Drinks Only
- Raw Meats
- Kashmiri
- Moroccan
- Nepalese
- Iranian
- Cuisine Varies
- Oriya
- Persian
- Canadian
- South American
- Southern
- Soul Food
- Caribbean
- Irish
- New American
- Hawaiian
- Cuban
- Diner
- Bubble Tea
- Teriyaki
`;

    try {
        const analysisResult = await analyzeFoodImage(req.file, prompt);
        req.name = analysisResult;

        console.log(analysisResult);

        next();
    } catch (error) {
        res.status(500).send({
            message: "Failed to analyze image",
            error: error.message,
        });
    }
};
