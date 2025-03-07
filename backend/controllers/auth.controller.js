import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "password pahir nhieu hon 6 ky tu" });
    }
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: " Email da ton tai" });
    }
    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: " UserName da ton tai" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: " all khong dung" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "thong tin khong hop le" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "thong tin khong hop le" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Đăng xuất thành công" });
  } catch (error) {
    console.log("error in layout controller", error.message);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
}
