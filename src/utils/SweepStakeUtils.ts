import SweepStake from "../models/Sweepstake";
import { Response } from "express";
import { StatusType } from "../enums/StatusEnum";
import User from "../models/User";

class SweepStakeUtils {
  async sweepStakeHasParticipant(
    sweepStakeID: string,
    participantUsername: string
  ) {
    const sweepStake = await SweepStake.findOne({ _id: sweepStakeID });

    if (!sweepStake) {
      return false;
    }

    return sweepStake.participants.some((user) => {
      return user.username === participantUsername;
    });
  }

  async addParticipant(
    sweepStake: any,
    addUserUsername: string,
    res: Response
  ) {
    const addUser = await User.findOne({ username: addUserUsername });

    if (!addUser) {
      return res
        .status(StatusType.NOT_FOUND)
        .json({ message: "Usuário a ser adicionado não encontrado" });
    }

    if (await this.sweepStakeHasParticipant(sweepStake._id, addUserUsername)) {
      return res
        .status(StatusType.CONFLIT)
        .json({ message: "Usuário a ser adicionado já existe no bolão" });
    }

    sweepStake.participants.push({
      name: addUser.name,
      points: 0,
      userId: addUser._id,
      username: addUser.username,
    });

    SweepStake.updateOne({ _id: sweepStake._id }, sweepStake)
      .then(() => {
        return res.status(StatusType.OK).json({ sweepStake });
      })
      .catch(() => {
        return res
          .status(StatusType.UNKNOW)
          .json({ message: "Erro ao atualizar o bolão" });
      });
  }
}

export default new SweepStakeUtils();
