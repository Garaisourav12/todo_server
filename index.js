const express = require("express");
const homeRoute = require("./routes/homeRoute");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();
const clc = require("cli-color");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');

// File Imports
const connectDb = require("./database");

// Constants
const app = express();
const PORT = process.env.PORT || 8000;
const store = new mongoDbSession({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});
const corsOptions = {
    origin: 'http://localhost:5173',
    methodes: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store,
        // cookie: {
        //     maxAge: 1000 * 60 * 60 * 24,
        //     secure: false,
        //     httpOnly: true,
        // }
    })
);
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use(homeRoute);
app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

// Connect to database
connectDb();

// Server listener
app.listen(PORT, () => {
    console.log(clc.yellowBright.underline(`http://localhost:${PORT}`));
});
