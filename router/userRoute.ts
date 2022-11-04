import express from "express";
import {
  createUser,
  readUsers,
  readOrgUsers,
  VerifiedUser,
  VerifiedUserFinally,
} from "../controller/userController";

import upload from "../util/multer";

const router = express.Router();

router.route("/create").post(createUser);
router.route("/").get(readUsers);
router.route("/organisation/:id").get(readOrgUsers);

router.route("/:id/token").get(VerifiedUser);

router.route("/:id/verify").post(VerifiedUserFinally);

export default router;
