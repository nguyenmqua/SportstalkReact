const db = require("../models")

module.exports = {
    updateByID: function(req,res){
        console.log(req.body)
        db.Notifications
        .remove({sportTicket: req.body.id, userId: req.body.userId})
        .then(res=>db.Bets.update({_id: req.body.id}, {completed: req.body.completed}))
        .then(res=>db.Notifications.create({userId: req.body.competitor, type: req.body.type, sportTicket: req.body.id}))       
        .then(dbdata=> {
            console.log("updatebyId", dbdata)
            console.log( dbdata)
            res.json(dbdata)})
        .catch(err => res.status(422).json(err));
    }

}