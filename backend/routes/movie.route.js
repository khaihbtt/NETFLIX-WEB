import express from "express";
import {
  getMovieCategory,
  getMovieDetails,
  getMovieTrailers,
  getSimilarMovie,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/setails", getMovieDetails);
router.get("/:id/similar", getSimilarMovie);
router.get("/:category", getMovieCategory);

export default router;
