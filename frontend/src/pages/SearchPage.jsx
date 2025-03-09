import React, { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setContentType(tab);
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      console.log("API Response:", res.data);
      setResults(res.data.content || []);
    } catch (error) {
      console.error("Search Error:", error);
      toast.error(
        error.response?.status === 404
          ? "Không tìm thấy kết quả, hãy kiểm tra danh mục tìm kiếm"
          : "Đã có lỗi xảy ra, vui lòng thử lại sau"
      );
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-4">
          {["movie", "tv", "preson"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded ${
                activeTab === tab ? "bg-red-600" : "bg-gray-800"
              } hover:bg-red-700`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "movie" ? "Movie" : tab === "tv" ? "TV Shows" : "Preson"}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.length > 0 ? (
            results.map((item) => {
              if (!item.poster_path && !item.profile_path) return null; // Bỏ qua nếu không có ảnh

              return activeTab === "preson" ? (
                <Link
                  key={item.id}
                  to={`/actor/${item.id}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={
                      ORIGINAL_IMG_BASE_URL +
                      (item.profile_path || item.poster_path)
                    }
                    alt={item.name}
                    className="max-h-96 rounded mx-auto"
                  />
                  <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
                </Link>
              ) : (
                <Link
                  key={item.id}
                  to={`/watch/${item.id}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={
                      ORIGINAL_IMG_BASE_URL +
                      (item.poster_path || item.profile_path)
                    }
                    alt={item.title || item.name}
                    className="w-full h-auto rounded"
                  />
                  <h2 className="mt-2 text-xl font-bold">
                    {item.title || item.name}
                  </h2>
                </Link>
              );
            })
          ) : (
            <p className="text-center col-span-full">Không tìm thấy kết quả.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
