import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db";
import userRoutes from "./routes/userRoute"

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello there!")
})

app.use("/api/users",userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});