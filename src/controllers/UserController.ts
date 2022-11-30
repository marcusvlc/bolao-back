import { Request, Response } from "express";
import User from "../models/User";

class UserController {
  async register(req: Request, res: Response) {
    const user = await User.create(req.body);
    return res.status(200).json(user);
  }

  async list(req: Request, res: Response) {
    const arrUsers = await User.find();

    console.log(arrUsers);
    return res.json(arrUsers);
  }
}

export default new UserController();
