const db = require("../models")

module.exports = {
    get: function (req,res){
        db.Notifications
        .find({userId:req.params.id})
        .sort({createdAt: -1})
        .populate('sportTicket')
        .populate({
            path: "sportTicket",
            populate: {path: "userId"}
        })
        .populate({
            path: "sportTicket",
            populate: {path: "competitor"}
        })
        .populate({
            path: "sportTicket",
            populate: {path: "updater"}
        })
        .populate({
            path: "sportTicket",
            populate: {path: "winner"}
        })
        .populate('userId')
        .then(DBdata=>
            res.json(DBdata)
            )
        .catch(err=>res.status(422).json(err))
    },
    remove: function(req,res){
        db.Notifications
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .catch(err => res.status(422).json(err));
    },
    create: function(req,res){
        db.Notifications
        .create(req.body)
        .then(db=>res.json(db))
        .catch(err => res.status(422).json(err));
    }
}