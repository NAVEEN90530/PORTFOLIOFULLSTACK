import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* -------------------------
   Generate JWT
-------------------------- */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* -------------------------
   LOGIN
-------------------------- */
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = generateToken(user._id);

  // ✅ IMPORTANT: Cross-domain cookie (Render compatible)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // REQUIRED (Render uses HTTPS)
    sameSite: "none",    // REQUIRED (frontend & backend different domains)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
    },
  });
};

/* -------------------------
   LOGOUT
-------------------------- */
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
  });

  res.status(200).json({ message: "Logged out successfully" });
};

/* -------------------------
   GET CURRENT USER
-------------------------- */
export const getMe = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
