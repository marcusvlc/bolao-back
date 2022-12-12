import { Request, Response } from "express";
import { StatusType } from "../enums/StatusEnum";
import User from "../models/User";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import TokenUtils from "../utils/TokenUtils";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");

    if (!user || !user.username) {
      return res
        .status(StatusType.NOT_FOUND)
        .send({ message: "Usuário não encontrado" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(StatusType.FORBIDDEN)
        .send({ error: "Usuário ou senha inválida" });
    }
    return res.send({
      user,
      token: TokenUtils.generateToken({ username: user.username }),
    });
  }
}

export default new AuthController();
