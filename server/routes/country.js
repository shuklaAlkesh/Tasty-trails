import express from "express";
import { getAllCountries } from "../controllers/country.js";

const app = express.Router()


app.get('/', getAllCountries);

export default app