const router = require("express").Router();
const sportsController = require("../../controllers/sportsController");

router.route("/")
  .get(sportsController.getSportsNews);

module.exports = router;