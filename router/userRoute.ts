import express from "express";
import {
  createUser,
  readUsers,
  readOrgUsers,
  VerifiedUser,
  VerifiedUserFinally,
  signinUser,
  resetPassword,
  changePassword,
  readUser,
} from "../controller/userController";

import upload from "../util/multer";

const router = express.Router();

router.route("/create").post(upload, createUser);
router.route("/signin").post(signinUser);

router.route("/").get(readUsers);
router.route("/:id").get(readUser);

router.route("/organisation/:id").get(readOrgUsers);

router.route("/:id/token").get(VerifiedUser);

// goto view!
// router.route("/:id/view").post(VerifiedUserFinally);

router.route("/:id/verify").post(VerifiedUserFinally);

router.route("/:id/:token/changePassword").post(changePassword);
router.route("/resetPassword").post(resetPassword);

export default router;
