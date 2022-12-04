import { BaseAuthBody, BaseSweepStakeBody } from "./RequestTypes";

export interface CreateInvitationRequest extends BaseSweepStakeBody {
  addUserUsername: string;
}

export interface AwsnerInviteRequest extends BaseAuthBody {
  inviteID: string;
  bAccept: boolean;
}
