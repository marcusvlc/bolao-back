import { Request, Response } from "express";
import { StatusType } from "../enums/StatusEnum";
import SweepStake from "../models/Sweepstake";
import ErrorHandlerUtils from "../utils/ErrorHandlerUtils";

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

  startSweepStake() {},

  async listByUser(req: Request, res: Response) {
    console.log(req.body.user);
    return res.status(200);
  },
};
