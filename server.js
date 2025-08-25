const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");   // ✅ import cors
const connectDB = require("./src/db");
const authRoutes = require("./src/routes/auth.routes");

dotenv.config();

const PORT = process.env.PORT || 3000;

// ✅ Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // frontend URL (Vite default port)
    credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
