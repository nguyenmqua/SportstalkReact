const router = require("express").Router();
const betsController = require("../../controllers/betsController");

router.route("/")
  .post(betsController.create)
  .put(betsController.updateByID)
  
router.route("/:id")
  .get(betsController.getByID)
  

module.exports = router;