import mongoose from "mongoose";
const { Schema } = mongoose;

const coinSchema = new Schema({
  symbol: {
    type: String,
    unique: true,
    index: true,
    minLength: 2,
    maxLenght: 4,
    uppercase: true,
  },
  price: {
    type: Number,
    min: 0,
  },
});

export const Coin = mongoose.model("Coin", coinSchema);
