const express = require("express")
//getting the burger data from models
const burger = require("../models/burgers")

var router = express.Router();


//gets all burgers
router.get("/", function (req, res) {
    //what is data
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };

        res.render("index", hbsObject);
    });
});

//create
router.post("/api/burger", function (req, res) {
    burger.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

//delete
router.delete("/api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//updates burger by id
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    console.log(req.body.devoured)
    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


module.exports = router;