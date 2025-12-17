// server.js
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
import categeryRoutes from './routes/categeryRoutes.js';
import linksRoutes from './routes/linksRoutes.js';
import createAdmin from './config/createAdmin.js';
import domainRoutes from './routes/domainRoutes.js';
import { logoutUser } from './controllers/authController.js';


dotenv.config();

const app = express();

/* ----------------------
   Basic app configuration
   ---------------------- */
app.set('trust proxy', 1); // if behind a proxy (Heroku, Render, Cloudflare)

// run once

// connectDB().then(() => {
//   createAdmin(); // ensure default admin exists
// });

connectDB();

app.use(express.json({ limit: '5mb' })); // protect against huge payloads
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
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
  max: parseInt(process.env.API_RATE_LIMIT) || 1500, // limit per IP
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

// Auth
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/logout', logoutUser);
app.use('/api/auth', authRoutes);

// Core APIs
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/categories', categeryRoutes);


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
