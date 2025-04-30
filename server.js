const express = require('express');
const colors = require('colors')
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');

// dot env configuration
dotenv.config();

// DB connection
connectDb();

// rest object
const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes 
app.use('/api/v1/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to the Restaurant Server</h1>");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`.white.bgMagenta);
});