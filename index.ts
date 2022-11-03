import express, { Application, Request, Response } from "express";
import cors from "cors";
import db from "./util/db";

import user from "./router/userRoute";
import organisation from "./router/organisationRoute";

db;

const port: number = 2233;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "This is the Voting API" });
});

app.use("/api/user", user);
app.use("/api/organisation", organisation);

app.listen(port, () => {
  console.log("");
  console.log("server is noe ready...!");
  console.log("");
});
