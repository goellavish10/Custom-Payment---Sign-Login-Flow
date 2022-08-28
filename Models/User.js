const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      requried: true,
      unique: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
