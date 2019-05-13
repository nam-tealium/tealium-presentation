const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const User = require("./models/user");
const Pizza = require("./models/pizza");

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}

// Dashboard SECTION =====================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get("/menu", isLoggedIn, function(req, res) {
  Pizza.find({ user: req.user.id }, function(err, pizza) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render("menu.ejs", {
        user: req.user,
        pizzas: pizza

        // get the user out of session and pass to template
      });
    }
  });
});
router.get("/order", isLoggedIn, function(req, res) {
  Pizza.find({ user: req.user.id }, function(err, pizza) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render("order.ejs", {
        user: req.user,
        pizzas: pizza

        // get the user out of session and pass to template
      });
    }
  });
});
// This route posts a new journal entry to the database
router.post("/order-pizza", isLoggedIn, jsonParser, function(req, res) {
  User.findById(req.user._id)
    .then(user => {
      if (user) {
        req.body.user = req.user._id;
        Pizza.create(req.body)
          .then(res.redirect(`/order`))
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      } else {
        const message = "user not found";
        console.error(message);
        return res.status(400).send(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});
module.exports = router;
