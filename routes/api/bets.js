const router = require("express").Router();
const betsController = require("../../controllers/betsController");

router.route("/")
  .post(betsController.create);

module.exports = router;