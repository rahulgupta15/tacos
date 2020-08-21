var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tacoSchema = new Schema({
  name: {
    type: String,
  },
  // protein: {
  //   type: String,
  //   required: true,
  //   lowercase: true,
  // },
  condiments: {
    type: String,
  },
  sauces: {
    type: String,
  },
  description: {
    type: String,
  },
});

const proteinSchema = new Schema({
  protein: {
    type: String,
  },
  tacos: [tacoSchema],
});

proteinModel = mongoose.model("Protein", proteinSchema);

/* GET protein listing. */
router.get("/", async function (req, res, next) {
  let all_proteins = await proteinModel.find({});
  console.log(all_proteins);
  res.render("proteins", { Proteins: all_proteins });
});

/* GET taco options listing. */
router.get("/:id", async function (req, res, next) {
  let stuff_from_database = await proteinModel.findOne({ _id: req.params.id });
  // res.send("Protein # " + stuff_from_database);
  res.render('proteindetail', {ProteinDetail: stuff_from_database})
});

router.post("/add", async function (req, res, next) {
  let incoming_data_object = {
    protein: req.body.submitProtein,
  };
  let result = await proteinModel.create(incoming_data_object);
  console.log(result);
  res.send("Thank you for submitting protein");
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
