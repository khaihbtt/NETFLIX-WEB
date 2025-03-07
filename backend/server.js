import express from "express";
import authRouters from "./routes/auth.route.js";

const app = express();

app.use("/api/v1/auth", authRouters);

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
