import express from "express";
const router = express.Router();
import UserController from "./controllers/UserController";

router.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ONLINE" });
});

router.post("/user/register", UserController.register);
router.get("/user", UserController.list);

export default router;
