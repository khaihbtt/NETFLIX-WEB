import express from "express";
import authRouters from "./routes/auth.route.js";
import movieRouters from "./routes/movie.route.js";
import tvRouters from "./routes/tv.route.js";
import searchRouters from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import cors from "cors"; // Sử dụng import cho cors

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://akamagi-netflix-trailer.vercel.app/", // Thay đổi URL này với URL frontend của bạn trên Vercel
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/movie", protectRoute, movieRouters);
app.use("/api/v1/tv", protectRoute, tvRouters);
app.use("/api/v1/search", protectRoute, searchRouters);

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});

// 4UR1Hj5d3K6ff1hx
// khaipkka4
