import express from "express";
import authRouters from "./routes/auth.route.js";
import movieRouters from "./routes/movie.route.js";
import tvRouters from "./routes/tv.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/movie", movieRouters);
app.use("/api/v1/tv", tvRouters);

app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});

// 4UR1Hj5d3K6ff1hx
// khaipkka4

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer" + ENV_VARS.TMOV_API_KEY,
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
