const router = require("express").Router();
const profileController = require("../../controllers/profileController");

router.route("/")
  .post(profileController.post)

module.exports = router;