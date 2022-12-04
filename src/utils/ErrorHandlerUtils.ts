import { Response } from "express";
import { StatusType } from "../enums/StatusEnum";

class ErrorHandlerUtils {
  handleCreationError(res: Response) {
    return res.status(StatusType.UNKNOW).json({ message: "Erro na criação" });
  }

  handleUpdateError(res: Response) {
    return res
      .status(StatusType.UNKNOW)
      .json({ message: "Erro na atualização" });
  }
}

export default new ErrorHandlerUtils();
