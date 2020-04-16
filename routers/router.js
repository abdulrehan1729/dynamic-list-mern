const router = require("express").Router();
const employee = require("../models/employSchema");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const item = new employee(req.body);
    let result = await item.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
