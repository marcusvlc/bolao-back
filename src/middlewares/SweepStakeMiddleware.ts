import { NextFunction, Request, Response } from "express";
import { StatusType } from "../enums/StatusEnum";
import SweepStake from "../models/Sweepstake";

export default {
  async sweepStakeVerify(req: Request, res: Response, next: NextFunction) {
    const { sweepStakeID, user }: { sweepStakeID: string; user: any } =
      req.body;

    const sweepStake = await SweepStake.findById(sweepStakeID);

    if (!sweepStake) {
      return res
        .status(StatusType.NOT_FOUND)
        .json({ message: "Bolão não encontrado" });
    }

    if (!sweepStake.owner._id.equals(user._id)) {
      return res
        .status(StatusType.UNAUTHORIZED)
        .json({ message: "Bolão não percence ao usuário autenticado" });
    }

    req.body.sweepStake = sweepStake;
    next();
  },
};
