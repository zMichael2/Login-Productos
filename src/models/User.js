const mongoose = require("mongoose");
const bcrypt =require ('bcryptjs');
const Schema = mongoose.Schema;
//const role = require('./Role');

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

User.statics.encryptPassword = async (password) => {
const salt = await bcrypt.genSalt(10)
return await bcrypt.hash(password, salt)
}

User.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model("User", User)

