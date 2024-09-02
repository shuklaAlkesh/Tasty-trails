import express from "express";
import {
    getAllRestaurants,
    getCuisine,
    getRestaurant,
    getRestaurantById,
    getRestaurantWithFilters,
    getRestaurantWithinRadius,
    uploadImage,
} from "../controllers/restaurant.js";
import multer from "multer"
import path from "path"

const app = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.get("/", getRestaurant);

app.post(
    "/upload",
    upload.single("image"),
    uploadImage,
    getCuisine
);

app.get("/get-all", getAllRestaurants);
app.get("/with-filter", getRestaurantWithFilters);
app.get("/getWithInRadius", getRestaurantWithinRadius);
app.get("/:id", getRestaurantById);

export default app;
