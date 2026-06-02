const mongoose = require('mongoose');
const dns = require('dns');

// ONLY apply the Google DNS patch if running locally.
// Forcing custom DNS servers inside Vercel's isolated network triggers a crash!
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Triggers the "exited with exit status: 1" Vercel error if connection fails
  }
};

module.exports = connectDB;