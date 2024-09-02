import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

const connectDB = (uri) => {
    mongoose
        .connect(uri, { dbName: "zomato-final-data" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        });
};

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(code).cookie("zomato-token", token, cookieOptions).json({
        success: true,
        message,
        user,
    });
};

const removeToken = (res, code, message) => {
    return res
        .status(code)
        .cookie("zomato-token", "", { ...cookieOptions, maxAge: 0 })
        .json({
            success: true,
            message,
        });
};


export {connectDB, sendToken, removeToken}