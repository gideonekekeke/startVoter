import express from "express";
import {
  createPresident,
  readPresident,
  readPresidentFromUsers,
} from "../controller/proController";

const router = express.Router();

router.route("/:id/create").post(createPresident);
router.route("/view").get(readPresident);
router.route("/:id/view").get(readPresidentFromUsers);

export default router;
