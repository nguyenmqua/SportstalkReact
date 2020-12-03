const db = require("../models")

module.exports = {
    get: function(req,res){
        db.Post.find({}) 
            .populate("userId")
            .sort({createdAt: -1})
            .then(dbUser => {
            res.json(dbUser);
            })
            .catch(err => {
            res.json(err);
            });
        }, 
     getById: function(req,res){
        console.log(req.params.id)
        db.Post
        .find({userId: req.params.id})
        .populate("userId")
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }
}
