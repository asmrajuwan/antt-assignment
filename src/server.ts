import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

const PORT = 3000;
const MONGO_URI =
    "mongodb+srv://rajuwan1234:rajuwan1234@antt.fjpvkxj.mongodb.net/antt?retryWrites=true&w=majority&appName=antt";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to database successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection error", error.message);
    });
