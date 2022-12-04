import { Response } from "express";
import { StatusType } from "../enums/StatusEnum";
import User from "../models/User";
import { BaseAuthBody, TypedRequest } from "./types/RequestTypes";
import {
  AwsnerInviteRequest,
  CreateInvitationRequest,
} from "./types/InvitationTypes";
import Invitation from "../models/Invitation";
import SweepStake from "../models/Sweepstake";
import SweepStakeUtils from "../utils/SweepStakeUtils";

export default {
  async createInvite(
    req: TypedRequest<CreateInvitationRequest>,
    res: Response
  ) {
    const { sweepStake, addUserUsername } = req.body;

    const userToAdd = await User.findOne({ username: addUserUsername });

    if (!userToAdd) {
      return res
        .status(StatusType.NOT_FOUND)
        .json({ message: "Usuário a ser convidado não encontrado" });
    }

    if (
      await Invitation.findOne({
        toUser: userToAdd._id,
        sweepStake: sweepStake._id,
      })
    ) {
      return res
        .status(StatusType.CONFLIT)
        .json({ message: "Usuário já foi convidado" });
    }

    const invite = new Invitation({
      toUser: userToAdd._id,
      sweepStake: sweepStake._id,
    });

    Invitation.create(invite)
      .then(() => {
        return res.status(StatusType.OK).json({ invite });
      })
      .catch(() => {
        return res
          .status(StatusType.UNKNOW)
          .json({ message: "Erro ao criar convite" });
      });
  },

  async answerInvite(req: TypedRequest<AwsnerInviteRequest>, res: Response) {
    const { user, inviteID, bAccept } = req.body;

    const invite = await Invitation.findById(inviteID);

    if (!invite) {
      return res
        .status(StatusType.NOT_FOUND)
        .json({ message: "Convite não encontrado" });
    }

    const sweepStake = await SweepStake.findById(invite.sweepStake);

    if (!sweepStake) {
      return res
        .status(StatusType.NOT_FOUND)
        .json({ message: "Bolão não encontrado" });
    }

    invite.delete();

    if (bAccept) {
      return SweepStakeUtils.addParticipant(sweepStake, user.username, res);
    }

    return res.status(StatusType.OK);
  },

  async listUserInvites(req: TypedRequest<BaseAuthBody>, res: Response) {
    const { user } = req.body;

    const invites = await Invitation.find({ toUser: user._id });

    return res.status(StatusType.OK).json({ invites });
  },
};
