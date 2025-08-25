const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");   // ✅ import cors
const connectDB = require("./src/db");
const authRoutes = require("./src/routes/auth.routes");

dotenv.config();

const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for local dev + vercel domain
app.use(cors({
    origin: [
        "http://localhost:5173",       // local development
        "https://cliff-one.vercel.app" // your deployed frontend
    ],
    credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
