// Import required modules
const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // Use process.env.PORT for dynamic port or default to 5000
const cors = require('cors');
const http = require('http').createServer(app);
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Import routes
const userRoute = require('./routes/user-routes');
const universityRoute = require('./routes/university-routes');

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Define routes
app.use('/api/users', userRoute);
app.use('/api/universities', universityRoute);


// Connect to MongoDB
mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server after successful MongoDB connection
        http.listen(port, () => {
            console.log('Connected to MongoDB & Backend');
        });

        // Socket.io event handlers can be added here if needed

    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
