const db = require("../models")

module.exports = {
    get: function(req,res){
        db.User.find({}) 
            .populate("userId")
            .sort({createdAt: -1})
            .then(dbUser => {
            res.json(dbUser);
            })
            .catch(err => {
            res.json(err);
            });
        },
    getByID: function (req,res) {
        db.User
        .find({username: req.params.id})
        .populate("userId")
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }
    }