const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// mongoose connection:
const uri = 'mongodb://localhost:27017/mern-tutorial-1'
mongoose.connect(uri);
mongoose.connection.on('connected', () => {
    console.log('\x1B[42m%s\x1b[0m', `=== MongoDB connected ===`);
});
mongoose.connection.on('error', (error) => {
    console.log('\x1b[41m%s\x1b[0m', '=== MongoDB connection error ===', error)
});
mongoose.connection.on('disconnected', () => {
    console.log('\x1B[44m%s\x1b[0m', '=== MongoDB disconnected ===');
});

// require routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is live on port: ${PORT}`);
});
