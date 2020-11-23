const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const profilePicSchema = new Schema({
  profilePic: { type: String, required: true },
  createdAt: { type: Date,
      default: Date.now()},
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users"
    }
});

const ProfilePic = mongoose.model("ProfilePic", profilePicSchema);


module.exports = ProfilePic;
