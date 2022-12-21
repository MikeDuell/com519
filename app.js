// import modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { WEB_PORT, MONGODB_URI } = process.env;



 app.use(express.static(path.join(__dirname, "public")));

// mongodb connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
 
 mongoose.connection.on("error", (err) => {
   console.error(err);
   console.log("MongoDB connection error. Please make sure MongoDB is running.");
   process.exit();
 });

app.set("view engine", "ejs");
// routes

const adherenceController = require("./controllers/adherence");
app.get("/adherences", adherenceController.list)
app.get("/adherences/delete/:id", adherenceController.delete)

const customerController = require("./controllers/customer");
app.get("/customers", customerController.list)
app.get("/customers/delete/:id", customerController.delete)

const stirtankController = require("./controllers/stirtank");
app.get("/stirtanks", stirtankController.list)
app.get("/stirtanks/delete/:id", stirtankController.delete)
/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

 
 
 



// render pages for get method
app.get("/", (req, res) => {
  res.render("overview")
});
app.get("/overview", (req, res) => {
  res.render("overview")
});

app.get("/stirtank", (req, res) => {
  res.render("stirtanks")
  });
app.get("/customers", (req, res) => {
  res.render("customers")
});
app.get("/signin", (req, res) => {
  res.render("signin")
});
app.get("/create-product", (req, res) => {
  res.render("create-product")
});
app.get("/create-user", (req, res) => {
  res.render("create-user")
});

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
