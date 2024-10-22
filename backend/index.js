import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Import the cors package
import rulesRoute from './routes/rule.js';

const app = express();
dotenv.config();

//MIddlewares
app.use(express.json());    //for json file trasportation

// Enable CORS for all routes
app.use(cors());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO); // MONGO=mongo atlas url
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error)
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

app.use("/api/rules", rulesRoute);

app.listen(8800, () => {
    connect();
    console.log("Connected to backend (listening at port 8800)");
});
