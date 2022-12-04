import { Request } from "express";

export interface TypedRequest<T> extends Request {
  body: T;
}

// todo : define types
export interface BaseSweepStakeBody extends BaseAuthBody {
  sweepStake: any;
}

export interface BaseAuthBody {
  user: any;
}
