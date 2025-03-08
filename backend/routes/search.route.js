import express from "express";

import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPreson,
  searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/preson/:query", searchPreson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
