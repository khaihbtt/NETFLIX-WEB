import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const userAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
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
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials); // Không cần baseURL
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Đăng Nhập thành công!");
    } catch (error) {
      toast.error(error.response?.data?.message || "đăng nhập thất bại!");
      set({ isLoggingIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Đăng xuất thất bại!");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
