const db = require("../models")

module.exports = {
    create: function(req,res){
        db.Bets
        .create(req.body)
        .then(res =>  db.Notifications.create({
            sportTicket: res._id,
            userId: req.body.competitor,
            type: "init wager"         
            }))
        .then(res =>  db.User.findOneAndUpdate({_id: req.body.competitor}, { $push: { notifications: res._id } }, { new: true },))
        .then(dbPost => {
            res.json(dbPost)})
        .catch(err => res.status(422).json(err))
    },

    getByID: function (req,res) {
        db.Bets
        .findById(req.params.id)
        .populate("userId")
        .populate("updater")
        .populate("winner")
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    },

    updateByID: function(req,res){

        db.Notifications
            .remove({sportTicket: req.body.id, userId: req.body.userId})
        .then(res=>db.Bets
            .update(
                {_id: req.body.id}, 
                { approval: true })        
            )
        .then(db.Notifications.create({
            sportTicket: req.body.id,
            userId: req.body.competitor,
            type: "response wager" 
            }))
        .then(res =>  db.User.findOneAndUpdate({_id: req.body.userId}, { $push: { sportTicket: req.body.id} }, { new: true },))
        .then(res =>  db.User.findOneAndUpdate({_id: req.body.competitor}, { $push: { sportTicket: req.body.id} }, { new: true },))
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }

}