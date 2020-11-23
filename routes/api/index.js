const router = require("express").Router();

const users = require("./users");
const post = require("./post");
const newsfeed = require("./newsfeed");
const comments = require("./comments");
const sports = require("./sports");
const profile = require("./profile")


router.use("/post", post);
router.use("/newsfeed", newsfeed);
router.use("/users", users);
router.use("/comments", comments);
router.use("/sportsdata", sports);
router.use("/profile", profile);


module.exports = router;
