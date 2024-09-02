import { TryCatch } from "../middlewares/error.js";
import { Country } from "../models/country.js";
import { ErrorHandler } from "../utils/utility.js";

export const getAllCountries = TryCatch(async (req, res, next) => {
        const countries = await Country.find();
        if(!countries){
            return next(new ErrorHandler("No countries found", 404))
        }
        res.status(200).json({
            success: true,
            countries
        });
})