// README: MERN Portfolio Backend
// Folder structure and key files provided below. Copy each file into your project.




// backend/
// │
// ├── server.js
// ├── package.json
// ├── .env
// ├── .gitignore
// │
// ├── config/
// │   └── db.js
// │
// ├── models/
// │   ├── User.js
// │   ├── Project.js
// │   ├── Testimonial.js
// │   ├── Category.js
// │   ├── Settings.js
// │   └── Quote.js
// │
// ├── controllers/
// │   ├── authController.js
// │   ├── projectController.js
// │   ├── testimonialController.js
// │   ├── settingsController.js
// │   └── quoteController.js
// │
// ├── routes/
// │   ├── authRoutes.js
// │   ├── projectRoutes.js
// │   ├── testimonialRoutes.js
// │   ├── settingsRoutes.js
// │   └── quoteRoutes.js
// │
// ├── middleware/
// │   └── authMiddleware.js
// │
// └── utils/
//     └── email.js








/*
package.json (run `npm init -y` then install deps below)

Dependencies:
  express mongoose dotenv bcryptjs jsonwebtoken nodemailer express-async-handler cors cookie-parser
DevDependencies:
  nodemon

Install:
 npm i express mongoose dotenv bcryptjs jsonwebtoken nodemailer express-async-handler cors cookie-parser
 npm i -D nodemon

Run:
 1) create .env (example below)
 2) npm run dev

Scripts in package.json:
 "start": "node server.js",
 "dev": "nodemon server.js"
*/

// ---------- package.json  ----------

{
  "name": "mern-portfolio-backend",
  "version": "1.0.0",
  "description": "Secure MERN portfolio backend with admin panel, projects, testimonials, settings, and quote mail system",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "NODE_ENV=production node server.js",
    "server": "nodemon server.js",
    "dev": "NODE_ENV=development nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.6.1",
    "express": "^4.21.2",
    "express-async-errors": "^3.1.1",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^7.0.0",
    "helmet": "^7.2.0",
    "hpp": "^0.2.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.20.1",
    "morgan": "^1.10.1",
    "nodemailer": "^6.10.1",
    "path": "^0.12.7",
    "xss-clean": "^0.1.4"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/node": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "nodemon": "^3.1.0"
  }
}


// ---------- .env  ----------

# -------------------------
# SERVER CONFIG
# -------------------------
PORT=5000
NODE_ENV=development

# -------------------------
# DATABASE
# -------------------------
MONGO_URI=mongodb://127.0.0.1:27017/portfolio

# -------------------------
# JWT AUTH
# -------------------------
JWT_SECRET=your_very_strong_random_secret_key
JWT_EXPIRE=1d

# -------------------------
# FRONTEND SECURITY (CORS)
# Add your live domains here (comma separated)
# Example: https://myportfolio.com,https://admin.myportfolio.com
# -------------------------
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5173

# -------------------------
# EMAIL CONFIG (Quote Form)
# -------------------------
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=Portfolio Website
SMTP_FROM_EMAIL=yourgmail@gmail.com


# Admin email where you receive quote messages
ADMIN_EMAIL=yourgmail@gmail.com

# -------------------------
# RATE LIMIT
# -------------------------
API_RATE_LIMIT=150



// // ---------- server.js ----------

import 'express-async-errors'; // handle async errors automatically
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';


// Routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';

dotenv.config();

const app = express();

/* ----------------------
   Basic app configuration
   ---------------------- */
app.set('trust proxy', 1); // if behind a proxy (Heroku, Render, Cloudflare)
connectDB();

app.use(express.json({ limit: '10kb' })); // protect against huge payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());

/* ----------------------
   Security middlewares
   ---------------------- */
// Secure HTTP headers
// in some deployments CSP can be strict; adjust if you embed external scripts/assets
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  })
);

// Prevent NoSQL injection (remove $ operators, dots from req bodies)
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// HTTP Parameter Pollution protection
app.use(hpp());

// Disable x-powered-by header set by Express
app.disable('x-powered-by');

/* ----------------------
   CORS (lockdown)
   ---------------------- */
/*
  In production set FRONTEND_URL to the actual domain(s) that will call your API.
  Example: FRONTEND_URL=https://your-frontend.com,ADMIN_URL=https://admin.your-frontend.com
*/
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

if (process.env.ADMIN_URL) allowedOrigins.push(...process.env.ADMIN_URL.split(',').map(s => s.trim()));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) {
        // In development allow all but recommend setting FRONTEND_URL for production
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('CORS policy: This origin is not allowed'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

/* ----------------------
   Request logging (morgan)
   ---------------------- */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

/* ----------------------
   Rate limiting
   ---------------------- */
// Global API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.API_RATE_LIMIT) || 150, // limit per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', apiLimiter);

// Specific stricter limiter for auth/login to prevent brute-force
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // max attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Try again later.' },
});

/* ----------------------
   Routes
   ---------------------- */
app.get('/', (req, res) => res.send('MERN Portfolio Backend is running'));

// Auth routes (apply loginLimiter to login endpoint inside authRoutes router or here)
app.use('/api/auth/login', loginLimiter); // apply to login path
app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/quotes', quoteRoutes);

/* ----------------------
   Serve static files (optional)
   ---------------------- */
// If you build a frontend and put it into /client/build, serve it.
// Uncomment / adjust if you're deploying fullstack together.
/*
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}
*/

/* ----------------------
   Not Found & Error handlers
   ---------------------- */
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  // If CORS origin error -> status 401 or 400
  if (err && err.message && err.message.includes('CORS policy')) {
    return res.status(401).json({ message: err.message });
  }

  console.error(err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Hide stack trace in production
  const response = {
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
});

/* ----------------------
   Start server
   ---------------------- */
const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});



// // ---------- config/db.js ----------
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // stop app
  }
};

export default connectDB;



// // ---------- models/User.js ----------
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);



// // ---------- models/Project.js ----------
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    imageUrl: { type: String, required: true },

    taglines: {
      type: [String],
      validate: v => v.length === 3, // exactly 3 taglines
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);



// // ---------- models/Testimonial.js ----------
import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);


// // ---------- models/Category.js ----------
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);



// // ---------- models/Settings.js ----------
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    stats: {
      happyCustomers: { type: Number, default: 0 },
      projectsCompleted: { type: Number, default: 0 },
      projectTechnologies: { type: Number, default: 0 }
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);



// // ---------- models/Quote.js ----------
import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    category: String,
    message: String,
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);



// // ---------- middleware/authMiddleware.js ----------

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(401).json({ message: "Not authorized. No token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};



// // ---------- controllers/authController.js ----------

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT USER
export const logoutUser = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.json({ message: "Logged out successfully" });
};

// GET CURRENT LOGGED-IN USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// // ---------- controllers/projectController.js ----------

import Project from "../models/Project.js";
import Category from "../models/Category.js";

// Create Project (Admin)
export const createProject = async (req, res) => {
  const { name, description, category, imageUrl, taglines } = req.body;

  if (!name || !description || !category || !imageUrl || !taglines)
    return res.status(400).json({ message: "All fields required" });

  const categoryExists = await Category.findById(category);
  if (!categoryExists)
    return res.status(400).json({ message: "Invalid category" });

  const project = await Project.create({
    name,
    description,
    category,
    imageUrl,
    taglines
  });

  res.status(201).json({ message: "Project created", project });
};

// Get All Projects (Public)
export const getProjects = async (req, res) => {
  const projects = await Project.find().populate("category", "name");
  res.status(200).json(projects);
};

// Get Single Project (Public)
export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("category");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

// Update Project (Admin)
export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!updated) return res.status(404).json({ message: "Project not found" });

  res.json({ message: "Project updated", project: updated });
};

// Delete Project (Admin)
export const deleteProject = async (req, res) => {
  const removed = await Project.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
};



// // ---------- controllers/testimonialController.js ----------

import Testimonial from "../models/Testimonial.js";

// Create Testimonial (Admin)
export const createTestimonial = async (req, res) => {
  const { name, companyName, content } = req.body;

  if (!name || !companyName || !content)
    return res.status(400).json({ message: "All fields required" });

  const testimonial = await Testimonial.create({
    name,
    companyName,
    content
  });

  res.status(201).json({ message: "Testimonial added", testimonial });
};

// Get All Testimonials (Public)
export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
};

// Delete Testimonial (Admin)
export const deleteTestimonial = async (req, res) => {
  const removed = await Testimonial.findByIdAndDelete(req.params.id);

  if (!removed)
    return res.status(404).json({ message: "Testimonial not found" });

  res.json({ message: "Deleted successfully" });
};



// // ---------- controllers/settingsController.js ----------

import Settings from "../models/Settings.js";

// GET ALL SETTINGS (Public)
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE CONTACT INFO (Admin)
export const updateContact = async (req, res) => {
  try {
    const { email, phone, address } = req.body;

    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    settings.contact = { email, phone, address };
    await settings.save();

    res.json({ message: "Contact updated", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATS (Admin)
export const updateStats = async (req, res) => {
  try {
    const { happyCustomers, projectsCompleted, projectTechnologies } =
      req.body;

    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    settings.stats = {
      happyCustomers,
      projectsCompleted,
      projectTechnologies,
    };

    await settings.save();

    res.json({ message: "Stats updated", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE CATEGORY (Admin)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    settings.categories.push({ name });
    await settings.save();

    res.json({ message: "Category added", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE CATEGORY (Admin)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    let settings = await Settings.findOne();
    if (!settings) return res.status(404).json({ message: "Not found" });

    settings.categories = settings.categories.filter(
      (cat) => cat._id.toString() !== id
    );

    await settings.save();

    res.json({ message: "Category deleted", settings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// // ---------- controllers/quoteController.js ----------

import Quote from "../models/Quote.js";
import { sendEmail } from "../utils/email.js";

// ⭐ SUBMIT QUOTE (USER)
export const submitQuote = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    const quote = await Quote.create({
      name,
      email,
      phone,
      category,
      message,
    });

    // send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Quote Request",
      message: `
        <h3>New Quote Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Category:</b> ${category}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(201).json({ message: "Quote submitted successfully", quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ GET ALL QUOTES (ADMIN ONLY)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ ADMIN REPLY TO USER EMAIL
export const replyToQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    // send email to user
    await sendEmail({
      to: quote.email,
      subject: "Response to Your Quote Request",
      message: `
        <h3>Hello ${quote.name},</h3>
        <p>${replyMessage}</p>
        <br />
        <p>Thank you,<br/>Admin Team</p>
      `,
    });

    quote.replied = true;
    await quote.save();

    res.status(200).json({ message: "Reply sent to user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// // ---------- utils/email.js ----------

// utils/email.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: Number(process.env.SMTP_PORT) === 465, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text: message,
    });

    console.log("📩 Email sent successfully");
  } catch (error) {
    console.log("❌ Email send error:", error.message);
  }
};

export default sendEmail;




// // ---------- routes/authRoutes.js ----------

import express from "express";
import { loginUser, logoutUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", logoutUser);

// GET LOGGED-IN USER DETAILS
router.get("/me", protect, getMe);

export default router;



// // ---------- routes/projectRoutes.js ----------

import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin Only
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;



// // ---------- routes/testimonialRoutes.js ----------

import express from "express";
import {
  createTestimonial,
  getTestimonials,
  deleteTestimonial
} from "../controllers/testimonialController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getTestimonials);

// Admin Only
router.post("/", protect, createTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;



// // ---------- routes/settingsRoutes.js ----------

import express from "express";
import {
  getSettings,
  updateContact,
  updateStats,
  createCategory,
  deleteCategory
} from "../controllers/settingsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getSettings);

// Admin Only
router.put("/contact", protect, updateContact);
router.put("/stats", protect, updateStats);
router.post("/category", protect, createCategory);
router.delete("/category/:id", protect, deleteCategory);

export default router;



// // ---------- routes/quoteRoutes.js ----------

import express from "express";
import Quote from "../models/Quote.js";
import sendEmail from "../utils/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    await Quote.create({ name, email, phone, category, message });

    // Email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      `New Quote Request - ${name}`,
      `
Name: ${name}
Email: ${email}
Phone: ${phone}
Category: ${category}
Message:
${message}
      `
    );

    // Auto reply to user
    await sendEmail(
      email,
      "We received your quote request",
      `Hi ${name}, Thank you for contacting us. We will get back shortly.`
    );

    res.status(201).json({ message: "Quote submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;



apis


🔐 Authentication (Admin)
POST /api/auth/login

Admin login to generate JWT token.

Body
{
  "email": "admin@example.com",
  "password": "password123"
}

Response
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}

GET /api/auth/profile

Requires JWT

Headers
Authorization: Bearer JWT_TOKEN

Response
{
  "id": "admin_id",
  "message": "Admin is authenticated"
}

📂 Projects API
POST /api/projects

Admin Only

Headers
Authorization: Bearer JWT_TOKEN

Body
{
  "name": "E-Commerce Website",
  "description": "A complete MERN e-commerce platform",
  "category": "64cb82f47e24cd2e68c873ab",
  "imageUrl": "https://example.com/project.png",
  "taglines": ["Fast", "Responsive", "Secure"]
}

Response
{
  "message": "Project created",
  "project": { ... }
}

GET /api/projects

Public – Fetch all projects

Response
[
  {
    "_id": "",
    "name": "",
    "description": "",
    "category": { "_id": "", "name": "" },
    "imageUrl": "",
    "taglines": ["", "", ""]
  }
]

GET /api/projects/:id

Fetch single project

Response
{
  "_id": "",
  "name": "",
  "description": "",
  "category": {},
  "imageUrl": "",
  "taglines": []
}

PUT /api/projects/:id

Admin only

Headers
Authorization: Bearer JWT_TOKEN

Body

(Any project field)

Response
{
  "message": "Project updated",
  "project": { ... }
}

DELETE /api/projects/:id

Admin only

Headers
Authorization: Bearer JWT_TOKEN

Response
{ "message": "Project deleted" }

⭐ Testimonials API
POST /api/testimonials

Admin only

Body
{
  "name": "John Doe",
  "companyName": "Tech Corp",
  "content": "Great work and fast delivery!"
}

Response
{
  "message": "Testimonial added",
  "testimonial": { ... }
}

GET /api/testimonials

Public

Response
[
  {
    "_id": "",
    "name": "",
    "companyName": "",
    "content": ""
  }
]

DELETE /api/testimonials/:id

Admin only

Response
{ "message": "Deleted successfully" }

⚙️ Settings API
GET /api/settings

Public

Response
{
  "email": "",
  "phone": "",
  "address": "",
  "stats": {
    "happyCustomers": 120,
    "projectsCompleted": 45,
    "projectTechnologies": 12
  },
  "categories": ["id1","id2"]
}

PUT /api/settings/contact

Admin only

Body
{
  "email": "info@example.com",
  "phone": "9876543210",
  "address": "Chennai, India"
}

PUT /api/settings/stats

Admin only

Body
{
  "happyCustomers": 150,
  "projectsCompleted": 72,
  "projectTechnologies": 24
}

📁 Category API
POST /api/settings/category

Admin Only

Body
{
  "name": "Full Stack"
}

DELETE /api/settings/category/:id

Admin Only

✉️ Quote / Contact API

Used in frontend “Get Quote” form.
Sends email to admin + auto-reply to user.

POST /api/quotes
Body
{
  "name": "Kumar",
  "email": "kumar@gmail.com",
  "phone": "9876543210",
  "category": "Web Development",
  "message": "I need a website for my business."
}

Response
{ "message": "Quote received" }

🔑 Authentication Header Required

For all admin routes include:

Authorization: Bearer YOUR_JWT_TOKEN

🚦Rate Limiting

Global: 150 requests / 15 minutes per IP

Login: 5 attempts / 10 minutes