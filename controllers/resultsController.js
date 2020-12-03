const db = require("../models")

module.exports = {
    updateByID: function(req,res){
        console.log(req.body)
        db.Bets
        .findOneAndUpdate({_id: req.body.id}, {completed: true}, { new: true },)
        .then(DBpost => res.json(DBpost))
        .catch(err => res.status(422).json(err));
    }

}