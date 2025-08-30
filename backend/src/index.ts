import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db";
import userRoutes from "./routes/userRoute"
import noteRoutes from "./routes/noteRoutes"

import cors from "cors"

dotenv.config();
connectDb();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


app.use("/api/users",userRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});