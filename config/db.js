import mongoose from "mongoose";

export const connectBD = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        await mongoose.connect(`${process.env.MONGO_URI}/quickblog`)
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
    }
}