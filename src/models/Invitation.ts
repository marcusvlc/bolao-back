import { Schema, model, Document } from "mongoose";

export interface IInvitation extends Document {
  toUser: Schema.Types.ObjectId;
  sweepStake: Schema.Types.ObjectId;
  createdAt: Date;
}

const InvitationSchema = new Schema<IInvitation>({
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
