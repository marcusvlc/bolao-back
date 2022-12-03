import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import { StatusType } from "../enums/StatusEnum";
import User from "../models/User";

export default {
  verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, payload: any) => {
      if (err) {
        return res
          .status(StatusType.UNAUTHORIZED)
          .send({ message: "Token inválido" });
      }

      const { username } = payload;
      User.findOne({ username })
        .then((user) => {
          req.body.user = user;
          next();
        })
        .catch(() => {
          return res
            .status(StatusType.NOT_FOUND)
            .send({ message: "Usuário não encontrado" });
        });
    });
  },
};
