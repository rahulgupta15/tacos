var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinksSchema = new Schema({
  name: {
    type: String,
  },
  modifiers: {
    type: String,
  },
  finishers: {
    type: String,
  },
  description: {
    type: String,
  },
});

const spiritsSchema = new Schema({
  spirit: {
    type: String,
  },
  drink: [drinksSchema],
});

spiritsModel = mongoose.model("Spirits", spiritsSchema);

/* GET protein listing. */
router.get("/", async function (req, res, next) {
  let all_spirits = await spiritsModel.find({});
  console.log(all_spirits);
  res.render("spirit", { Spirits: all_spirits });
});

/* GET taco options listing. */
router.get("/:id", async function (req, res, next) {
  let stuff_from_database = await spiritsModel.findOne({ _id: req.params.id });
  // res.send("Protein # " + stuff_from_database);
  res.render('spiritdetail', {SpiritDetail: stuff_from_database})
});

router.post("/add", async function (req, res, next) {
  let incoming_data_object = {
    protein: req.body.submitProtein,
  };
  let result = await proteinModel.create(incoming_data_object);
  console.log(result);
  res.send(`Thank you for submitting a protein <a href="/proteins/">Add more proteins!</a>`);

});

router.post("/addtaco", async function (req, res, next) {
  let proteinrow = await proteinModel.findById(req.body.hiddenid)
  let incoming_taco_object = {
    name: req.body.taconame,
    condiments: req.body.tacocondiments,
    sauces: req.body.tacosauces,
    description: req.body.tacodescription,
  };

    proteinrow.tacos.push(incoming_taco_object)
    await proteinrow.save()
    res.send(`Thank you for submitting a taco <a href="/proteins/${req.body.hiddenid}">Add more tacos!</a>`);
});

module.exports = router;
