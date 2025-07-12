const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/hotels', require('./routes/hotelRoute'));

app.use('/api/rooms', require('./routes/roomRoutes'));

app.use('/api/bookings', require('./routes/bookingRoutes'));




// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
