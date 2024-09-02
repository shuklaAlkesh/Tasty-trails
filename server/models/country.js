import mongoose,{Schema, model} from "mongoose";

const CountrySchema = new Schema(
    {
        countryId:{
            type: Number,
            unique: true,
            required: true,
        },
        countryName: {
            type: String, 
            required: true
        }
    }
)

export const Country = mongoose.models.Country || model("Country", CountrySchema);