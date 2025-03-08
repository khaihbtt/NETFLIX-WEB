import React, { useEffect, useState } from "react";
import { useContentStore } from "../src/store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]); // ✅ Sửa null thành []
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
      } catch (error) {
        console.error("Lỗi khi lấy trending content:", error);
      }
    };

    getTrendingContent();
  }, [contentType]); // ✅ Sửa lỗi chính tả

  return { trendingContent };
};

export default useGetTrendingContent;
