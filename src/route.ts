import express from "express";
import AuthController from "./controllers/AuthController";
import InvitationController from "./controllers/InvitationController";
import SweepStakeController from "./controllers/SweepStakeController";
const router = express.Router();
import UserController from "./controllers/UserController";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import SweepStakeMiddleware from "./middlewares/SweepStakeMiddleware";

router.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ONLINE" });
});

router.post("/user/register", UserController.register);
router.get("/user", AuthMiddleware.verifyJWT, UserController.list);
router.post("/auth", AuthController.authenticate);

router.post(
  "/sweepstake",
  AuthMiddleware.verifyJWT,
  SweepStakeController.create
);

router.post(
  "/invite",
  [AuthMiddleware.verifyJWT, SweepStakeMiddleware.sweepStakeVerify],
  InvitationController.createInvite
);
router.post(
  "/invite/answer",
  [AuthMiddleware.verifyJWT],
  InvitationController.answerInvite
);
router.get(
  "/invite",
  [AuthMiddleware.verifyJWT],
  InvitationController.listUserInvites
);

router.get("/delete", UserController.deleteAll);

export default router;
