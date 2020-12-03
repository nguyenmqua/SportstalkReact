const router = require("express").Router();
const userbet = require("../../controllers/userbetController.js");

router.route("/")
  .put(userbet.update)

router.route("/:id")
  .get(userbet.getByID)

module.exports = router;