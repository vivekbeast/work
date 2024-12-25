import mongoose from "mongoose";

export const connectMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("CONNECTION IS DONE WITH MONGODB")
    } catch (e) {
        console.log("ERROR CONNECTING MONGODB", e)
    }
}
