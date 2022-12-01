import { Request, Response } from "express";
import User from "../models/User";
import { StatusType } from "../enums/StatusEnum";

class UserController {
  async register(req: Request, res: Response) {
    const { username, email }: { username: string; email: string } = req.body;

    if ((await User.findOne({ username })) || (await User.findOne({ email }))) {
      return res
        .status(StatusType.CONFLIT)
        .json({ message: "Usuário já cadastrado" });
    }

    User.create(req.body)
      .then((user) => {
        return res.status(StatusType.OK).json(user);
      })
      .catch(() => {
        return res
          .status(StatusType.UNKNOW)
          .json({ message: "Erro no cadastro" });
      });
  }

  async list(req: Request, res: Response) {
    const arrUsers = await User.find();

    return res.json(arrUsers);
  }
}

export default new UserController();
