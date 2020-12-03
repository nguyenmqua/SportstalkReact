const db = require("../models")

module.exports = {
    getByID: function (req,res) {
        db.User
        .findById(req.params.id)
        .populate("sportTicket")
        .populate({
            path: "sportTicket",
            populate: {path: "userId"}
        })
        .populate({
            path: "sportTicket",
            populate: {path: "competitor"}
        })
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    },

    update: function (req,res){
        console.log(req.body)
        db.Bets
        .findOneAndUpdate({_id:req.body.sportTicket},{winner: req.body.winner, update: true, updater: req.body.updater},{new: true})
        .then(res=>db.Notifications.create
            ({
            sportTicket: req.body.sportTicket,
            type:"update winner",
            userId: req.body.competitor
            })        
        )
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }
}