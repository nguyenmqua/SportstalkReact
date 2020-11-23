const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const usersSchema = new Schema({
  firstname: {
    type: String,
    unique: false,
    required: true,
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  admin: {
    type: Boolean,
    unique: false,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  Posts: [
    {
    type: Schema.Types.ObjectId,    
    ref: "Post"
  }
  ],
  profilePic:
  {
    type: String,    
    default: "https://res.cloudinary.com/sportstalk/image/upload/t_media_lib_thumb/v1606089802/download_vlvnep.jpg",
    required: true
  }
});

usersSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.validPassword = (password, encrypted) => {
  return bcrypt.compareSync(password, encrypted);
};

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
