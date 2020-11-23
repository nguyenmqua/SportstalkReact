const db = require("../models")

module.exports = {
    create: function(req,res){
        console.log(req.body)
        db.Comments
        .create(req.body) 
        .then(res => db.Post.findOneAndUpdate({_id: req.body.postId}, { $push: { Comments: res._id } }, { new: true },))
        .then(res => db.Post
            .findById({_id: req.body.postId})
            .populate({
                path: "Comments",
                populate: {path: "userId"}
            }))
        .then(dbPost => res.json(dbPost))
        .catch(err => res.status(422).json(err))
    },

        getByID: function (req,res) {
        console.log(req.params.id)
        db.Comments
        .find({postId: req.params.id})
        .populate("userId")
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }

}