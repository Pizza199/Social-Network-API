const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./Routes/userRoutes");
const thoughtRoutes = require("./Routes/thoughtRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRoutes);
app.use(thoughtRoutes);

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-db'
)
.then (console.log(`🌍 Connected on localhost:${PORT}`))
.catch(err => console.log('couldnt connect to db'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));



