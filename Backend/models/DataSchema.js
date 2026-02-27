import mongoose, { mongo } from "mongoose";
const newSchema = new mongoose.Schema({
    website:String,
    username:String,
    password:String
})

export const userData = mongoose.model("dataofuser",newSchema)