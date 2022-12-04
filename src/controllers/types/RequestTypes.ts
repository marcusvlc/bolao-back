import { Request } from "express";
import { IUser } from "../../models/User";
import { ISweepStake } from "../../models/Sweepstake";

export interface TypedRequest<T> extends Request {
  body: T;
}

export interface BaseSweepStakeBody extends BaseAuthBody {
  sweepStake: ISweepStake;
}

export interface BaseAuthBody {
  user: IUser;
}
