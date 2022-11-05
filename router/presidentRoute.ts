import express from "express";
import {
  createPresident,
  readPresident,
  readPresidentFromUsers,
  readCandidate,
} from "../controller/candidateController";

const router = express.Router();

router.route("/:id/create").post(createPresident);
router.route("/view").get(readPresident);
router.route("/view/candidate").get(readCandidate);
router.route("/:id/view").get(readPresidentFromUsers);

export default router;
