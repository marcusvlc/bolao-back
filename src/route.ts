import express from "express";
import AuthController from "./controllers/AuthController";
import InvitationController from "./controllers/InvitationController";
import SweepStakeController from "./controllers/SweepStakeController";
import UserController from "./controllers/UserController";
import { RoutePrefix } from "./enums/RoutePrefixEnum";
import { StatusType } from "./enums/StatusEnum";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import SweepStakeMiddleware from "./middlewares/SweepStakeMiddleware";

const router = express.Router();

router.post(`${RoutePrefix.USER}/register`, UserController.register);
router.get(
  `${RoutePrefix.USER}`,
  AuthMiddleware.verifyJWT,
  UserController.list
);
router.post(RoutePrefix.AUTH, AuthController.authenticate);

router.get(RoutePrefix.VERIFY_TOKEN, AuthMiddleware.verifyJWT, (_req, res) =>
  res.send(StatusType.OK)
);

router.post(
  RoutePrefix.SWEEP_STAKE,
  AuthMiddleware.verifyJWT,
  SweepStakeController.create
);
router.post(
  `${RoutePrefix.SWEEP_STAKE}/start`,
  [AuthMiddleware.verifyJWT, SweepStakeMiddleware.sweepStakeVerify],
  SweepStakeController.startSweepStake
);

router.get(
  `${RoutePrefix.SWEEP_STAKE}/owner`,
  [AuthMiddleware.verifyJWT],
  SweepStakeController.listUserOwnerSweepStakes
);
router.get(
  `${RoutePrefix.SWEEP_STAKE}/participant`,
  [AuthMiddleware.verifyJWT],
  SweepStakeController.listUserParticipantSweepStake
);

router.post(
  RoutePrefix.INVITATION,
  [AuthMiddleware.verifyJWT, SweepStakeMiddleware.sweepStakeVerify],
  InvitationController.createInvite
);
router.post(
  `${RoutePrefix.INVITATION}/answer`,
  [AuthMiddleware.verifyJWT],
  InvitationController.answerInvite
);
router.get(
  RoutePrefix.INVITATION,
  [AuthMiddleware.verifyJWT],
  InvitationController.listUserInvites
);

export default router;
