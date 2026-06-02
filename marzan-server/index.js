const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Fixes local Node.js v24 network lookup bug

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Essential Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clean CORS configuration 
// (Vercel.json handles the main preflight headers on production; this keeps local dev working)
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
}));

// Base API Status Route
app.get('/', (req, res) =>
  res.json({
    name: 'marzan-server',
    status: 'ok',
    routes: ['/api/users', '/api/users/login', '/api/articles'],
  }),
);

// App Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));