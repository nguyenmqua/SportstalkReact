const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const betsSchema = new Schema({
  sportTicket: { type: Array },
  createdAt: { type: Date,
      default: Date.now()},
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users",
    required: true
    },
  competitor:{
    type: Schema.Types.ObjectId,
    ref: "Users"
    },
  winner:{
      type: Schema.Types.ObjectId,
      ref: "Users"
      },
  updater:{
      type: Schema.Types.ObjectId,
      ref: "Users"
      },
  wager:{type: Number},
  approval: {
    type:Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  update: {
    type:Boolean,
    default: false
  }
});

const Bets = mongoose.model("Bets", betsSchema);


module.exports = Bets;
