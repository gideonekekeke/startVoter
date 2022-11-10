import express, { Application, Request, Response } from "express";
import cors from "cors";
import DB from "./util/db";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

import user from "./router/userRoute";
import organisation from "./router/organisationRoute";

import president from "./router/presidentRoute";
import vicepresident from "./router/vicePresidentRoute";
import secretary from "./router/secretaryRoute";
import socialSecretary from "./router/socialSecretaryRoute";
import pro from "./router/proRoute";
import legal from "./router/legalRoute";

import presVote from "./router/voters/votersRouter";
import viceVote from "./router/voters/viceVote";
import secVote from "./router/voters/secVote";
import socialVote from "./router/voters/socialVote";
import proVote from "./router/voters/proVoter";
import legalVote from "./router/voters/legalVote";

const port: number = 2233;
const app: Application = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

DB;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "This is the Voting API" });
});

app.use("/api/user", user);
app.use("/api/organisation", organisation);

app.use("/api/president", president);
app.use("/api/vicepresident", vicepresident);
app.use("/api/secretary", secretary);
app.use("/api/socialSecretary", socialSecretary);
app.use("/api/pro", pro);
app.use("/api/legal", legal);

app.use("/api/presVote", presVote);
app.use("/api/viceVote", viceVote);
app.use("/api/secVote", secVote);
app.use("/api/socialVote", socialVote);
app.use("/api/proVote", proVote);
app.use("/api/legalVote", legalVote);

const db = mongoose.connection;

// db.on("open", () => {
//   const observer = db.collection("voter").watch();

//   observer.on("change", (change) => {
//     if (change.operationType === "insert") {
//       io.emit("voter");
//     }
//   });
// });

app.listen(port, () => {
  console.log("");
  console.log("server is now ready...!");
  console.log("");
});
