import { addCountryToDB, addDataToDB } from "./libs/fetchdata.js";
import path from "path"
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
import { connectDB } from "./utils/feature.js";

dotenv.config({
    path: "./.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI)

const processFiles = async () => {
    for (let i = 1; i <= 5; i++) {
        const filePath = path.join(__dirname, 'data', `file${i}.json`);
        await addDataToDB(filePath);

        console.log(`uploaded file${i}.json`);
        
    }

    // mongoose.connection.close();
};

// Call this for the entries in the database.
processFiles();

const addCountries = async() => {
    const filePath = path.join(__dirname, 'data', 'country.json')
    await addCountryToDB(filePath)
}


// Call this for adding the countries in the database
// addCountries()