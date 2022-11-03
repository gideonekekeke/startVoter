import express from "express";
import {
  createOrganisation,
  getOrganisation,
} from "../controller/organisationController";

const router = express.Router();

router.route("/create").post(createOrganisation);

router.route("/").get(getOrganisation);

export default router;
