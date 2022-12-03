import { Request, Response } from "express";
import SweepStake from "../models/Sweepstake";

export default {
  create(req: Request, res: Response) {
    const { user, title } = req.body;
  },

  addParticipant() {},

  startSweepStake() {},

  async listByUser(req: Request, res: Response) {
    console.log(req.body.user);
    return res.status(200);
  },
};
