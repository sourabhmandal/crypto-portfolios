import mongoose from "mongoose";
const { Schema } = mongoose;

const balanceSchema = new Schema({
  symbol: {
    type: String,
    minLength: 2,
    maxLenght: 4,
    uppercase: true,
  },
  balance: {
    type: Number,
  },
  walletAddress: {
    type: String,
  },
});

export const Balance = mongoose.model("Balance", balanceSchema);
