const router = require("express").Router();

const users = require("./users");
const post = require("./post");
const newsfeed = require("./newsfeed");
const comments = require("./comments");
const sports = require("./sports");
const profile = require("./profile")
const sportsNews = require("./sportsnews")
const usersdata  = require("./usersdata")


router.use("/post", post);
router.use("/newsfeed", newsfeed);
router.use("/users", users);
router.use("/comments", comments);
router.use("/sportsdata", sports);
router.use("/profile", profile);
router.use("/sportsnews",sportsNews)
router.use("/usersdata",usersdata)


module.exports = router;
