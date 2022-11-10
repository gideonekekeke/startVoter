import express from "express";
import {
  createVote,
  readVote,
  readYourVoters,
  // deleteVote,
} from "../../controller/voters/vicePresyVote";

const router = express.Router();

router.route("/:id/:voterID/create").post(createVote);
// router.route("/:id/:voterID").delete(deleteVote);
router.route("/view").get(readVote);

router.route("/:id/view").get(readYourVoters);

export default router;
