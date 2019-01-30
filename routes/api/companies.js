const express = require("express");
const router = express.Router();

// Company Model
const Company = require("../../models/company");

// @route  POST api/company
// @desc   Create a company
// @access Public
router.post("/", (req, res) => {
  const newCompany = new Company({
    name: req.body.name
  });

  newCompany.save().then(company => res.json(company));
});

module.exports = router;
