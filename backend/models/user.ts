import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    minLength: 2,
    maxLenght: 20,
  },
  walletAddress: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
