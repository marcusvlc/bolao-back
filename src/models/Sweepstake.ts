import { Schema, model, Document } from "mongoose";

export interface ISweepStake extends Document {
  title: string;
  started: boolean;
  owner: Schema.Types.ObjectId;
  createdAt: Date;
  participants: Participant[];
}

interface Participant {
  userId: Schema.Types.ObjectId;
  name: string;
  username: string;
  points: number;
}

export const SweepStakeSchema = new Schema<ISweepStake>({
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
