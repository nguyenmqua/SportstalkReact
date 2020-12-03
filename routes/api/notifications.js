const router = require("express").Router();
const notificationsController = require("../../controllers/notificationsController")

router.route("/:id")
    .get(notificationsController.get)
    .delete(notificationsController.remove)

module.exports = router;