import { Request, Response } from "express";
import { StatusType } from "../enums/StatusEnum";
import SweepStake from "../models/Sweepstake";
import ErrorHandlerUtils from "../utils/ErrorHandlerUtils";
import {
  BaseAuthBody,
  BaseSweepStakeBody,
  TypedRequest,
} from "./types/RequestTypes";

export default {
  create(req: Request, res: Response) {
    const { user, title } = req.body;

    const sweepStake = new SweepStake({
      title,
      owner: user._id,
      participants: [],
      started: false,
    });

    SweepStake.create(sweepStake)
      .then(() => {
        return res.status(StatusType.OK).json({ sweepStake });
      })
      .catch(() => ErrorHandlerUtils.handleCreationError(res));
  },

  startSweepStake(req: TypedRequest<BaseSweepStakeBody>, res: Response) {
    const { sweepStake } = req.body;

    sweepStake.started = true;

    SweepStake.updateOne({ _id: sweepStake._id }, sweepStake)
      .then(() => {
        return res.status(StatusType.OK).json({ sweepStake });
      })
      .catch(() => ErrorHandlerUtils.handleUpdateError(res));
  },

  async listUserOwnerSweepStakes(
    req: TypedRequest<BaseAuthBody>,
    res: Response
  ) {
    const { user } = req.body;
    const sweepStakes = await SweepStake.find({ owner: user._id });

    return res.status(StatusType.OK).json({ sweepStakes });
  },

  async listUserParticipantSweepStake(
    req: TypedRequest<BaseAuthBody>,
    res: Response
  ) {
    const { user } = req.body;
    const sweepStakes = await SweepStake.find({
      "participants.userId": { $in: [user._id] },
    });

    return res.status(StatusType.OK).json({ sweepStakes });
  },

  async listByUser(req: Request, res: Response) {
    console.log(req.body.user);
    return res.status(200);
  },
};
