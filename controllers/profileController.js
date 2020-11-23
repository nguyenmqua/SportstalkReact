const db = require("../models")

module.exports = {
    post: function(req,res){
        console.log(req.body.profilePic)
        db.ProfilePic
        .create(req.body) 
        .then(res => db.User.findOneAndUpdate({_id: res.userId},{ profilePic: req.body.profilePic }))
        .then(dbPost => res.json(dbPost))
        .catch(err => res.status(422).json(err))
         }
    }