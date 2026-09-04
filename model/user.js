const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const user = mongoose.model("user", UserSchema);

module.exports = user;
