import express from "express";
import AuthController from "./controllers/AuthController";
import SweepStakeController from "./controllers/SweepStakeController";
const router = express.Router();
import UserController from "./controllers/UserController";
import AuthMiddleware from "./middlewares/AuthMiddleware";

router.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ONLINE" });
});

router.post("/user/register", UserController.register);
router.get("/user", AuthMiddleware.verifyJWT, UserController.list);
router.post("/auth", AuthController.authenticate);

router.get(
  "/sweepstake",
  AuthMiddleware.verifyJWT,
  SweepStakeController.listByUser
);

router.get("/delete", UserController.deleteAll);

export default router;
