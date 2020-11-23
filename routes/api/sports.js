const router = require("express").Router();
const sportsController = require("../../controllers/sportsController");

router.route("/")
  .get(sportsController.get);

module.exports = router;