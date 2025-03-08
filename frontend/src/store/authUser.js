import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const userAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });

    try {
      const response = await axios.post("/api/v1/auth/signup", credentials); // Không cần baseURL
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Tạo tài khoản thành công!");
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response?.data); // Kiểm tra lỗi chi tiết
      toast.error(error.response?.data?.message || "Đăng ký thất bại!");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async () => {},
  logout: async () => {},
  authCheck: async () => {},
}));
