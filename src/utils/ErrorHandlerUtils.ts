import { Response } from "express";
import { StatusType } from "../enums/StatusEnum";

class ErrorHandlerUtils {
  handleCreationError(res: Response) {
    return res.status(StatusType.UNKNOW).json({ message: "Erro na criação" });
  }
}

export default new ErrorHandlerUtils();
