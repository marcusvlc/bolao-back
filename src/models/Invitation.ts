import { Schema, model } from "mongoose";

const InvitationSchema = new Schema({
  toUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sweepStake: {
    type: Schema.Types.ObjectId,
    ref: "SweepStake",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invitation = model("Invitation", InvitationSchema);

export default Invitation;
