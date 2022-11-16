const app = require("../app");

const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
    return Celebrity.find()
    .then((allCelebs) => {
        console.log("Retrieved celebrities from DB:", allCelebs);
        res.render("celebrities/celebrities.hbs", { celebrities: allCelebs });
    })
    .catch((error) => {
        console.log("Error while getting the celebrities from the DB: ", error);
    });
})

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
  
    Celebrity.create({name, occupation, catchPhrase})
    .then(() => res.redirect("/celebrities"))
    .catch((error) => res.render("celebrities/new-celebrity"));
});



module.exports = router;