// import modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { WEB_PORT, MONGODB_URI } = process.env;
const bodyParser = require("body-parser");
const expressSession = require("express-session");
app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))

global.user = false
app.use('*', async(req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user
  }
  next();
  })

  app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
  })

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

// disable add products if there is no user logged in

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}
app.get("/create-adherence", authMiddleware, (req, res) => {
  res.render("create-adherence", { errors: {} });
});
app.get("/create-stirtank", authMiddleware, (req, res) => {
  res.render("create-stirtank", { errors: {} });
});

// mongodb connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
 
 mongoose.connection.on("error", (err) => {
   console.error(err);
   console.log("MongoDB connection error. Please make sure MongoDB is running.");
   process.exit();
 });

app.set("view engine", "ejs");
// route handlers

const adherenceController = require("./controllers/adherence");
app.get("/adherences", authMiddleware, adherenceController.list)
app.get("/adherences/delete/:id", adherenceController.delete)
app.post("/create-adherence", adherenceController.create);
app.get("/adherences/update/:id", adherenceController.edit);
app.post("/adherences/update/:id", adherenceController.update);

const customerController = require("./controllers/customer");
app.get("/customers", authMiddleware,  customerController.list)
app.get("/customers/delete/:id", customerController.delete)

const stirtankController = require("./controllers/stirtank");
app.get("/stirtanks", authMiddleware, stirtankController.list)
app.get("/stirtanks/delete/:id", stirtankController.delete)
app.post("/create-stirtank", stirtankController.create);
app.get("/stirtanks/update/:id", stirtankController.edit);
app.post("/stirtanks/update/:id", stirtankController.update);

const userController = require("./controllers/user");
const User = require("./models/User");
app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});
app.post("/join", userController.create);

app.get("/signin", (req, res) => {
  res.render('signin', { errors: {} })
});
app.post("/signin", userController.login);




// render pages
app.get("/", (req, res) => {
  res.render("overview")
});
app.get("/overview", (req, res) => {
  res.render("overview")
});

app.get("/stirtanks", (req, res) => {
  res.render("stirtanks")
  });
app.get("/customers", (req, res) => {
  res.render("customers")
});
app.get("/signin", (req, res) => {
  res.render("signin")
});
app.get("/create-stirtank", (req, res) => {
  res.render("create-stirtank", {errors: {}})
});
app.get("/create-adherence", (req, res) => {
  res.render("create-adherence", {errors: {}})
});



app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
