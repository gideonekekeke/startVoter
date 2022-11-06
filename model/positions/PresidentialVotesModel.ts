import mongoose from "mongoose";

interface User {
  fullName?: string;
  user?: {}[];
}

interface MainUser extends User, mongoose.Document {}

const presidentialVoteSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>(
  "presidentialVotes",
  presidentialVoteSchema
);
