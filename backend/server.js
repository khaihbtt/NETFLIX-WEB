import express from "express";
import authRouters from "./routes/auth.route.js";
import movieRouters from "./routes/movie.route.js";
import tvRouters from "./routes/tv.route.js";
import searchRouters from "./routes/search.route.js";
import path from "path";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/movie", protectRoute, movieRouters);
app.use("/api/v1/tv", protectRoute, tvRouters);
app.use("/api/v1/search", protectRoute, searchRouters);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
});

// 4UR1Hj5d3K6ff1hx
// khaipkka4
