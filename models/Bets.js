const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const betSchema = new Schema({
  sportTicket: { type: String, required: true },
  createdAt: { type: Date,
      default: Date.now()},
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users",
    required: true
    },
    competitor:{type: String}
});

const Bet = mongoose.model("Bet", betSchema);


module.exports = Bet;
