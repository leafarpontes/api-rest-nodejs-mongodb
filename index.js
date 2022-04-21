// initial configuration
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()

// reading JSON / middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes configuration
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// initial route / endpoint
app.get('/', (req, res) => {
  res.json({message: "Hi Express!"});
});

// mongoose connection
mongoose
  .connect(`${process.env.MONGO_DB_CONNECTION}`)
  .then(() => {
    console.log("Connected to MongoDB.")
    app.listen(3000);
  })
  .catch((err) => console.log(err));