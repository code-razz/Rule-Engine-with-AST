import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app=express();
dotenv.config();

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO);   //MONGO=mongo atlas url
        console.log("Connected to mongoDB");
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("discoonected",()=>{
    console.log("MOngoDB disconnected!");
})

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connectedf");
})

app.listen(8800,()=>{
    connect();
    console.log("Connected to backend (listening at port 8800")
})
