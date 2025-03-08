import { response } from "express";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPreson(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          tile: data.results[0].name,
          searchTyle: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ success: false, message: "loi server" });
  }
}
export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          tile: data.results[0].name,
          searchTyle: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ success: false, message: "loi server" });
  }
}
export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          tile: data.results[0].name,
          searchTyle: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ success: false, message: "loi server" });
  }
}
export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "loi server" });
  }
}
export async function removeItemFromSearchHistory(req, res) {
  const id = parseInt(req.params.id); // ✅ Gán giá trị ngay từ đầu

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { searchHistory: { id } },
    });

    res.status(200).json({ success: true, message: "Xóa lịch sử thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
}
