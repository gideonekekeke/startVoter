import express from "express";
import { createUser } from "../controller/userController";
import upload from "../util/multer";

const router = express.Router();

router.route("/create").post(createUser);

export default router;
