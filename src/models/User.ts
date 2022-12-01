import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: true, // todo: change to false later
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
