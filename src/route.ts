import express from "express";
import AuthController from "./controllers/AuthController";
const router = express.Router();
import UserController from "./controllers/UserController";
import AuthMiddleware from "./middlewares/AuthMiddleware";

router.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ONLINE" });
});

router.post("/user/register", UserController.register);
router.get("/user", AuthMiddleware.verifyJWT, UserController.list);

router.post("/auth", AuthController.authenticate);

export default router;