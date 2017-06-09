var express = require("express");

var router = express.Router();
var db = require("../config/connection.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll().then(function(data) {
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  db.Burger.create({
      burger_name: req.body.burger_name
    }).then(function(data) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(data);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
  db.Burger.update({ devoured: true }, { where: { id: req.body.burger_id } }).then(function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;
