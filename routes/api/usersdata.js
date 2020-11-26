const router = require("express").Router();
const userdata = require("../../controllers/userdataController.js");

router.route("/")
  .get(userdata.get)

router.route("/:id")
  .get(userdata.getByID)

module.exports = router;