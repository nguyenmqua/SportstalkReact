const db = require("../models")

module.exports = {
    updateByID: function(req,res){
        console.log(req.body)
        db.Notifications
        .remove({sportTicket: req.body.sportTicket, userId: req.body.userId})       
        .then(db.Bets.findOneAndUpdate({_id: req.body.sportTicket}, {completed: true}, { new: true },))
        .then(dbdata=> res.json(dbdata))
        .catch(err => res.status(422).json(err));
    },

    create: function(req,res){
        db.Notifications
        .remove({sportTicket: req.body.sportTicket, userId: req.body.userId})       
        .then(db.Notifications.create({userId: req.body.updater, sportTicket: req.body.sportTicket,type: 'decline wager'}))
        .then(dbdata=> res.json(dbdata))
        .catch(err => res.status(422).json(err));       
    }

}