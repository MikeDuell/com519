require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
// routes

const adherenceController = require("./controllers/adherence");
app.get("/adherences", adherenceController.list)


/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

 const mongoose = require("mongoose");
 const { WEB_PORT, MONGODB_URI } = process.env;
 
 mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
 
 mongoose.connection.on("error", (err) => {
   console.error(err);
   console.log("MongoDB connection error. Please make sure MongoDB is running.");
   process.exit();
 });

app.use(express.static(path.join(__dirname, "public")));

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
