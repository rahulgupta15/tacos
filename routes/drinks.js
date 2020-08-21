var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkBaseSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
});

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  drinkBase: {
    type: [drinkBaseSchema],
    required: true,
    lowercase: true,
  },
  modifiers: {
    type: String,
    required: true,
    lowercase: true,
  },
  finishers: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
});

drinkModel = mongoose.model('Drink', drinkSchema);


/* GET protein listing. */
router.get('/', function(req, res, next) {
  res.send('Lets get our drink on!');
});

/* GET taco options listing. */
router.get('/:id', function(req, res, next) {
  res.send('Drink # ' + req.params.id);
});
module.exports = router;
