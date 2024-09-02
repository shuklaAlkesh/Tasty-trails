import mongoose,{Schema, model} from "mongoose";

const CuisineSchema = new Schema(
    {
        cuisineName: {
            type: String, 
            unique: true,
            required: true
        }
    }
)

export const Cuisine = mongoose.models.Cuisine || model("Cuisine", CuisineSchema);