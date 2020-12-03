const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  sportTicket:  {
    type: Schema.Types.ObjectId,    
    ref: "Bets",
    },
  createdAt: { type: Date,
      default: Date.now()},
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users",
    required: true
    },
  new: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
  }
});

const Notifications = mongoose.model("Notifications", notificationsSchema);


module.exports = Notifications;
