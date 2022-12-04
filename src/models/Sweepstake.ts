import { Schema, model } from "mongoose";

export const SweepStakeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  started: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  participants: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      name: { type: String },
      username: { type: String },
      points: { type: Number },
    },
  ],
});

const SweepStake = model("SweepStake", SweepStakeSchema);

export default SweepStake;
