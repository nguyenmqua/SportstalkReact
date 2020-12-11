const router = require("express").Router();
const resultsController = require("../../controllers/resultsController");

router.route("/")
  .put(resultsController.updateByID)
  .post(resultsController.create)
  


module.exports = router;