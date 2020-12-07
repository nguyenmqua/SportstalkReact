const db = require("../models")

module.exports = {
    updateByID: function(req,res){
        console.log(req.body)
        db.Notifications
        .remove({sportTicket: req.body.id, userId: req.body.userId})       
        db.Bets.findOneAndUpdate({_id: req.body.id}, {completed: true}, { new: true },)
        .then(dbdata=> res.json(dbdata))
        .catch(err => res.status(422).json(err));
    }

}