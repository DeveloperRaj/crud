// import statements
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Init express app
const app = express();

// Use bodyParser and cors as middlewares
app.use(bodyParser.json());
app.use(cors());

// Adding connection to database
mongoose.connect(
	process.env.MONGO_URI, 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}
);

const db = mongoose.connection;
db.on("error", () => console.log("ERROR"));
db.once("open", () => console.log("Connected to db"));

const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/UserRoutes');

app.use('/users/', userRoutes);

// start listening for requests
const onServerStart = () => console.log(`Server running on ${PORT}`);
app.listen(PORT, onServerStart);