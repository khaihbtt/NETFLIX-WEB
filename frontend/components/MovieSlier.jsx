import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../src/store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../src/utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);
  // Chuyển đổi tên danh mục thành dạng chuẩn
  const formattedCategoryName = category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.context || []);
      } catch (error) {
        setContent([]);
      }
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth", // ✅ Sửa lại "behavior" đúng chính tả
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-28"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-2xl font-bold mb-4">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={
                  SMALL_IMG_BASE_URL + (item.backdrop_path || item.poster_path)
                }
                alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-30 flex items-center justify-center size-12 rounded-full bg-black hover:bg-opacity-75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-30 flex items-center justify-center size-12 rounded-full bg-black hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
