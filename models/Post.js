const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const postSchema = new Schema({
  post: { type: String, required: true },
  createdAt: { type: Date,
      default: Date.now()},
  userId: 
    {
    type: Schema.Types.ObjectId,    
    ref: "Users"
    },
  Comments:[
      {
        type: Schema.Types.ObjectId,    
        ref: "Comments"
    }
    ]
});

const Post = mongoose.model("Post", postSchema);


module.exports = Post;
