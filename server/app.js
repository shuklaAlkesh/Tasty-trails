import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";

import cors from "cors"
import cookieParser from "cookie-parser"

import RestaurantRoute from "./routes/restaurant.js"
import CountryRoute from "./routes/country.js"
import { Cuisine } from "./models/cuisine.js";

dotenv.config({
    path: "./.env",
});


const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"

connectDB(mongoURI)

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/cuisines', async (req, res) => {
    try {
        const cuisine = await Cuisine.find(); // Fetch all cuisine from the database
        res.status(200).json(cuisine); // Send the cuisine as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cuisine', error });
    }
});

app.get('/cuisineNames', async (req, res) => {
    try {
        const cuisine = await Cuisine.find().select('cuisineName -_id'); // Fetch all cuisine from the database
        res.status(200).json(cuisine); // Send the cuisine as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cuisine', error });
    }
});

app.use('/restaurant', RestaurantRoute)
app.use('/country', CountryRoute)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`server is running on port: ${port} in ${envMode} mode`);
});


export {envMode}


