const router = require("express").Router();
const newsfeedController = require("../../controllers/newsfeedController");

router.route("/")
  .get(newsfeedController.get)

router.route("/:id")
  .get(newsfeedController.getById)
  
module.exports = router;